// ---------------------------------------------------------------------
// Supabase Realtime — server-side broadcast.
//
// Passengers book as guests (no Supabase auth), so postgres_changes can't
// safely reach them without leaking internal ids. Instead the server PUSHES
// Broadcast messages over Supabase's stateless HTTP API. The frontend uses
// an anon client only to SUBSCRIBE. Channels are keyed by public data:
//
//   booking-<bookingCode>  -> one passenger watching their own booking
//   drivers-available      -> shared feed of new / taken ride requests
//   admin-bookings         -> shared feed for the admin dashboard
//
// Every payload contains ONLY safe fields (never the booking UUID).
// Failures are swallowed: realtime is a nicety, never blocks the request.
// ---------------------------------------------------------------------
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function broadcast(topic, event, payload) {
  try {
    const res = await fetch(`${url}/realtime/v1/api/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ messages: [{ topic, event, payload }] }),
    });
    if (!res.ok) {
      console.error('realtime broadcast failed:', res.status, await res.text());
    }
  } catch (err) {
    console.error('realtime broadcast error:', err);
  }
}

// Notify the passenger watching a single booking.
function pushBookingStatus(code, payload) {
  return broadcast(`booking-${code}`, 'status', payload);
}

// A newly-verified booking becomes available for any driver to accept.
function announceAvailableRide(ride) {
  return Promise.all([
    broadcast('drivers-available', 'new_request', ride),
    broadcast('admin-bookings', 'changed', { bookingCode: ride.bookingCode }),
  ]);
}

// A booking was claimed (or cancelled) — remove it from the open feed.
function announceRequestTaken(code) {
  return Promise.all([
    broadcast('drivers-available', 'request_taken', { bookingCode: code }),
    broadcast('admin-bookings', 'changed', { bookingCode: code }),
  ]);
}

// Generic "something changed on this booking" ping for the admin dashboard.
function pingAdmin(code) {
  return broadcast('admin-bookings', 'changed', { bookingCode: code });
}

module.exports = {
  broadcast,
  pushBookingStatus,
  announceAvailableRide,
  announceRequestTaken,
  pingAdmin,
};
