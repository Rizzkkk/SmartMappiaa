// ---------------------------------------------------------------------
// The Express application.
//
// We DEFINE the app here and export it, but we do NOT call app.listen()
// here. That lets the same app run two ways:
//   - server.js   -> normal long-running server on your machine
//   - api/index.js -> serverless function on Vercel
// ---------------------------------------------------------------------
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const trackingRoutes = require('./routes/tracking');
const adminRoutes = require('./routes/admin');
const driverRoutes = require('./routes/driver');

const app = express();

app.use(cors()); // allow the frontend (e.g. on Vercel) to call this API
app.use(express.json()); // parse JSON request bodies

// --- Routes ---
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/driver', driverRoutes);

// Friendly root
app.get('/', (req, res) => {
  res.json({ name: 'Smart Mappia API', status: 'running' });
});

// 404 fallback for anything unmatched
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
