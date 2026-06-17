// ---------------------------------------------------------------------
// Seed (or repair) a ready-to-use TEST USER (passenger) account.
//
//   npm run seed:user
//
// Creates user123@smartmappia.com / user123 (override with USER_SEED_*),
// email pre-confirmed, role = passenger. Idempotent — safe to re-run.
// These are TEST credentials; change them for production.
// ---------------------------------------------------------------------
require('dotenv').config();
const { supabase } = require('../lib/supabase');

const email = (process.env.USER_SEED_EMAIL || 'user123@smartmappia.com').toLowerCase();
const password = process.env.USER_SEED_PASSWORD || 'user123';

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
    console.log(`User already existed — password reset. (${email})`);
  } else {
    userId = created.user.id;
    console.log(`Created user auth account. (${email})`);
  }

  const { error: profileErr } = await supabase
    .from('profiles')
    .upsert(
      { id: userId, role: 'passenger', email, full_name: 'Test User', whatsapp_number: '+966500000001' },
      { onConflict: 'id' }
    );
  if (profileErr) throw profileErr;

  console.log('\n✅ Test user ready. Sign in at /login with:');
  console.log(`     email:    ${email}`);
  console.log(`     password: ${password}`);
}

run().catch((err) => {
  console.error('seed-user failed:', err.message || err);
  process.exit(1);
});
