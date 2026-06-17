// ---------------------------------------------------------------------
// Seed (or repair) a ready-to-use TEST DRIVER account — pre-approved.
//
//   npm run seed:driver
//
// Creates driver123@smartmappia.com / driver123 (override with DRIVER_SEED_*),
// email pre-confirmed, role = driver, driver_approved = true (so it can accept
// rides immediately — no admin approval step needed for testing).
// Idempotent — safe to re-run. TEST credentials; change them for production.
// ---------------------------------------------------------------------
require('dotenv').config();
const { supabase } = require('../lib/supabase');

const email = (process.env.DRIVER_SEED_EMAIL || 'driver123@smartmappia.com').toLowerCase();
const password = process.env.DRIVER_SEED_PASSWORD || 'driver123';

async function findUserByEmail(targetEmail) {
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const match = (data.users || []).find((u) => (u.email || '').toLowerCase() === targetEmail);
    if (match) return match;
    if (!data.users || data.users.length < 200) break;
  }
  return null;
}

async function run() {
  let userId;
  const { data: created, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createErr) {
    const existing = await findUserByEmail(email);
    if (!existing) throw createErr;
    userId = existing.id;
    await supabase.auth.admin.updateUserById(userId, { password, email_confirm: true });
    console.log(`Driver already existed — password reset. (${email})`);
  } else {
    userId = created.user.id;
    console.log(`Created driver auth account. (${email})`);
  }

  const { error: profileErr } = await supabase
    .from('profiles')
    .upsert(
      {
        id: userId,
        role: 'driver',
        email,
        full_name: 'Test Driver',
        whatsapp_number: '+966500000002',
        driver_approved: true,
      },
      { onConflict: 'id' }
    );
  if (profileErr) throw profileErr;

  console.log('\n✅ Test driver ready (already approved). Sign in at /login with:');
  console.log(`     email:    ${email}`);
  console.log(`     password: ${password}`);
}

run().catch((err) => {
  console.error('seed-driver failed:', err.message || err);
  process.exit(1);
});
