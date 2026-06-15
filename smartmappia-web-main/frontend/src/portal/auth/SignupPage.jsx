// ---------------------------------------------------------------------
// Create an account as a Rider (passenger) or Driver. Role is sent to the
// backend on first sign-in; admins are granted only via the env allow-list.
// ---------------------------------------------------------------------
import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { UserPlus, User, Car, MailCheck } from 'lucide-react';
import { useAuth } from '../lib/AuthProvider';
import { PortalShell, Card, Field, inputClass, btnPrimary, Spinner } from '../components/ui';

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';

  const [role, setRole] = useState('passenger');
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    setBusy(true);
    try {
      const { needsConfirmation } = await signUp(email.trim(), password, {
        role,
        full_name: fullName,
        whatsapp_number: whatsapp,
      });
      if (needsConfirmation) {
        setConfirmSent(true);
      } else {
        navigate(role === 'driver' ? '/driver' : next, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (confirmSent) {
    return (
      <PortalShell title="Confirm your email" onBack={() => navigate('/login')}>
        <div className="max-w-sm mx-auto">
          <Card className="p-6 text-center">
            <MailCheck className="w-10 h-10 text-brand-orange mx-auto mb-3" />
            <p className="font-bold text-brand-dark">Almost there</p>
            <p className="text-sm text-brand-grey mt-1 mb-4">
              We sent a confirmation link to <b>{email}</b>. Confirm it, then sign in.
            </p>
            <Link to={`/login?next=${encodeURIComponent(next)}`} className={btnPrimary}>Go to sign in</Link>
          </Card>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell title="Create account" onBack={() => navigate('/')}>
      <div className="max-w-sm mx-auto">
        <Card className="p-6">
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>}

          <div className="grid grid-cols-2 gap-2 bg-brand-surface p-1.5 rounded-xl border border-brand-border mb-5">
            <button type="button" onClick={() => setRole('passenger')}
              className={`py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${role === 'passenger' ? 'bg-brand-orange text-white shadow' : 'text-brand-grey'}`}>
              <User className="w-4 h-4" /> Rider
            </button>
            <button type="button" onClick={() => setRole('driver')}
              className={`py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${role === 'driver' ? 'bg-brand-orange text-white shadow' : 'text-brand-grey'}`}>
              <Car className="w-4 h-4" /> Driver
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <Field label="Full name"><input className={inputClass} value={fullName} onChange={(e) => setFullName(e.target.value)} required /></Field>
            <Field label="WhatsApp number"><input className={inputClass} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+9665XXXXXXXX" required /></Field>
            <Field label="Email"><input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
            <Field label="Password"><input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required /></Field>

            {role === 'driver' && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-2">
                Driver accounts require admin approval before you can accept rides.
              </p>
            )}

            <button type="submit" disabled={busy} className={btnPrimary + ' w-full'}>
              {busy ? <Spinner className="!border-white/40 !border-t-white" /> : <><UserPlus className="w-4 h-4" /> Create account</>}
            </button>
          </form>

          <p className="text-sm text-brand-grey text-center mt-4">
            Already have an account?{' '}
            <Link to={`/login?next=${encodeURIComponent(next)}`} className="text-brand-orange font-bold">Sign in</Link>
          </p>
        </Card>
      </div>
    </PortalShell>
  );
}
