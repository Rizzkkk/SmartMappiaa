const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const {
  createBooking,
  getBookingByCode,
  cancelBooking,
} = require('../controllers/bookingsController');
const {
  getPaymentInstructions,
  createProofUploadUrl,
  recordPaymentProof,
} = require('../controllers/paymentsController');

// POST /api/bookings              -> create a booking (requires sign-in)
router.post('/', requireAuth, createBooking);

// GET  /api/bookings/:bookingCode -> booking summary
router.get('/:bookingCode', getBookingByCode);

// POST /api/bookings/:bookingCode/cancel -> owner cancels the trip
router.post('/:bookingCode/cancel', requireAuth, cancelBooking);

// --- Payments (increments 1 & 2) ---
// GET  /api/bookings/:bookingCode/payment-instructions -> how to pay (STC Pay)
router.get('/:bookingCode/payment-instructions', getPaymentInstructions);

// POST /api/bookings/:bookingCode/payment-proof/signed-url -> signed upload URL
router.post('/:bookingCode/payment-proof/signed-url', createProofUploadUrl);

// POST /api/bookings/:bookingCode/payment-proof -> record uploaded proof
router.post('/:bookingCode/payment-proof', recordPaymentProof);

module.exports = router;
