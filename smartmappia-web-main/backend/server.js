// ---------------------------------------------------------------------
// Local development server.
// Run with:  npm run dev   (auto-restart)  or  npm start
//
// On Vercel this file is NOT used — api/index.js is the entrypoint there.
// ---------------------------------------------------------------------
require('dotenv').config(); // load .env BEFORE anything reads process.env
const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Smart Mappia API running on http://localhost:${PORT}`);
});
