// ---------------------------------------------------------------------
// Payment verification state machine (spec §9).
//
// Both paths converge here so the status transitions are defined ONCE:
//   - test auto-verify (proof upload, AUTO_VERIFY_STCPAY_TEST_MODE=true)
//   - admin manual verify / reject
//
// NOTE: Supabase's JS client has no multi-table transaction. We write the
// payments row, the proof, then the booking in sequence and bail on the
// first error. For the MVP volume this is acceptable; a Postgres function
// (RPC) is the upgrade path if atomicity becomes critical.
// ---------------------------------------------------------------------
const { supabase } = require('./supabase');
const { addTrackingEvent } = require('./tracking');
const { pushBookingStatus, announceAvailableRide, pingAdmin } = require('./realtime');

// mode is a verification_mode enum value: 'test_auto' | 'admin_manual'.
async function verifyBookingPayment({ booking, mode, adminId = null, proofId = null, manualReference = null }) {
  const now = new Date().toISOString();
  const verifiedBySystem = mode === 'test_auto';

  // 1. Record the payment as verified.
  const { error: payErr } = await supabase.from('payments').insert({
    booking_id: booking.id,
    provider: 'stcpay_manual',
    amount: booking.fare_amount,
    currency: booking.currency,
    status: 'verified',
    manual_reference: manualReference,
    verified_by_admin_id: adminId,
    verified_by_system: verifiedBySystem,
    verification_mode: mode,
    verified_at: now,
  });
  if (payErr) return { error: payErr };

  // 2. Mark the proof (if one was supplied) verified.
  if (proofId) {
    const { error: proofErr } = await supabase
      .from('payment_proofs')
      .update({
        status: 'verified',
        verification_mode: mode,
        admin_reviewer_id: adminId,
        reviewed_at: now,
        test_auto_verified_at: verifiedBySystem ? now : null,
      })
      .eq('id', proofId);
    if (proofErr) return { error: proofErr };
  }

  // 3. Confirm the booking.
  const { data: updated, error: bookErr } = await supabase
    .from('bookings')
    .update({
      payment_status: 'verified',
      booking_status: 'confirmed',
      verification_mode: mode,
      confirmed_at: now,
      test_auto_verified_at: verifiedBySystem ? now : null,
    })
    .eq('id', booking.id)
    .select('booking_code, payment_status, booking_status, verification_mode, confirmed_at')
    .single();
  if (bookErr) return { error: bookErr };

  // 4. Timeline event.
  await addTrackingEvent(booking.id, {
    eventType: verifiedBySystem ? 'auto_verified' : 'payment_verified',
    title: 'Payment verified',
    message: verifiedBySystem
      ? 'Your payment was auto-verified (test mode). Your booking is confirmed.'
      : 'Your payment has been verified. Your booking is confirmed.',
    createdByUserId: adminId,
  });

  // 5. Realtime: confirm to the passenger AND open the ride to drivers.
  pushBookingStatus(booking.booking_code, {
    paymentStatus: 'verified',
    bookingStatus: 'confirmed',
  });
  const { data: summary } = await supabase
    .from('bookings')
    .select(
      'booking_code, trip_type, airport_terminal, pickup_address, pickup_lat, pickup_lng, ' +
        'dropoff_address, dropoff_lat, dropoff_lng, pickup_datetime, fare_amount, currency'
    )
    .eq('id', booking.id)
    .single();
  if (summary) {
    announceAvailableRide({
      bookingCode: summary.booking_code,
      tripType: summary.trip_type,
      airportTerminal: summary.airport_terminal,
      pickupAddress: summary.pickup_address,
      pickupLat: summary.pickup_lat,
      pickupLng: summary.pickup_lng,
      dropoffAddress: summary.dropoff_address,
      dropoffLat: summary.dropoff_lat,
      dropoffLng: summary.dropoff_lng,
      pickupDatetime: summary.pickup_datetime,
      fareAmount: summary.fare_amount,
      currency: summary.currency,
    });
  }

  return { booking: updated };
}

async function rejectBookingPayment({ booking, adminId = null, reason = null, proofId = null }) {
  const now = new Date().toISOString();

  // 1. Mark the proof rejected (if supplied).
  if (proofId) {
    const { error: proofErr } = await supabase
      .from('payment_proofs')
      .update({
        status: 'rejected',
        admin_reviewer_id: adminId,
        reviewed_at: now,
        rejection_reason: reason,
      })
      .eq('id', proofId);
    if (proofErr) return { error: proofErr };
  }

  // 2. Send the booking back to awaiting a (new) proof.
  const { data: updated, error: bookErr } = await supabase
    .from('bookings')
    .update({
      payment_status: 'rejected',
      booking_status: 'pending_payment',
    })
    .eq('id', booking.id)
    .select('booking_code, payment_status, booking_status')
    .single();
  if (bookErr) return { error: bookErr };

  // 3. Timeline event.
  await addTrackingEvent(booking.id, {
    eventType: 'payment_rejected',
    title: 'Payment rejected',
    message: reason
      ? `Your payment proof was rejected: ${reason}. Please upload a valid proof.`
      : 'Your payment proof was rejected. Please upload a valid proof.',
    createdByUserId: adminId,
  });

  // 4. Realtime: tell the passenger to re-upload; refresh the admin board.
  pushBookingStatus(booking.booking_code, {
    paymentStatus: 'rejected',
    bookingStatus: 'pending_payment',
  });
  pingAdmin(booking.booking_code);

  return { booking: updated };
}

module.exports = { verifyBookingPayment, rejectBookingPayment };
