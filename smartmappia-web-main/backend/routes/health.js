const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

// GET /api/health -> confirms the server runs and can reach Supabase.
router.get('/', async (req, res) => {
  try {
    // Lightweight query just to confirm the DB connection works.
    const { error } = await supabase.from('bookings').select('id').limit(1);
    res.json({
      status: 'ok',
      db: error ? 'error' : 'connected',
      testMode: process.env.AUTO_VERIFY_STCPAY_TEST_MODE === 'true',
      paymentMode: process.env.PAYMENT_MODE || 'unset',
      time: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
