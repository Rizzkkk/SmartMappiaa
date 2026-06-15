// ---------------------------------------------------------------------
// MVP fare model:
//   Airport Pick & Drop — flat SAR 100 base, plus a 3.75% service fee.
//
//     base        = SAR 100.00
//     service fee = 3.75% of base = SAR 3.75
//     total       = SAR 103.75   <- what the passenger pays / fare snapshot
//
// The returned total is stored as a SNAPSHOT on the booking and is never
// recalculated after the passenger submits, keeping the agreed price fixed.
// ---------------------------------------------------------------------
const FARE_BASE = 100;
const SERVICE_FEE_RATE = 0.0375; // 3.75%
const CURRENCY = 'SAR';

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

// Quote a fresh fare. The argument is accepted (and ignored) so existing
// callers passing a routeType keep working.
function quoteFare(_opts = {}) {
  const base = FARE_BASE;
  const serviceFee = round2(base * SERVICE_FEE_RATE);
  const amount = round2(base + serviceFee);
  return { base, serviceFeeRate: SERVICE_FEE_RATE, serviceFee, amount, currency: CURRENCY };
}

// Break a stored total back into base + service fee (for receipts / instructions).
// Derived from the total so it stays correct for an existing fare snapshot.
function fareBreakdown(total) {
  const t = round2(total);
  const base = round2(t / (1 + SERVICE_FEE_RATE));
  const serviceFee = round2(t - base);
  return { base, serviceFeeRate: SERVICE_FEE_RATE, serviceFee, total: t, currency: CURRENCY };
}

module.exports = { quoteFare, fareBreakdown, FARE_BASE, SERVICE_FEE_RATE, CURRENCY };
