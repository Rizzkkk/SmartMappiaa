const express = require('express');
const router = express.Router();
const { getTracking } = require('../controllers/trackingController');

// GET /api/tracking/:bookingCode -> public timeline + ETAs (no internal ids)
router.get('/:bookingCode', getTracking);

module.exports = router;
