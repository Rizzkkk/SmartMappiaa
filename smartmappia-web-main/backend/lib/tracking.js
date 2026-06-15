// ---------------------------------------------------------------------
// tracking_events helper.
//
// Every meaningful state change appends a timeline row that drives the
// Grab-style tracking page (spec §7). Centralized so controllers stay thin
// and event writes look identical everywhere.
// ---------------------------------------------------------------------
const { supabase } = require('./supabase');

// Append one timeline event. Best-effort: a failed event write must never
// break the primary action, so we surface the error to the caller to log
// but callers generally do not abort on it.
async function addTrackingEvent(bookingId, { eventType, title, message, createdByUserId = null }) {
  const { error } = await supabase.from('tracking_events').insert({
    booking_id: bookingId,
    event_type: eventType,
    title: title ?? null,
    message: message ?? null,
    created_by_user_id: createdByUserId,
  });
  return { error };
}

module.exports = { addTrackingEvent };
