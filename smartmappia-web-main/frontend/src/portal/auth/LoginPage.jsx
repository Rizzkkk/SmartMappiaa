// ---------------------------------------------------------------------
// Sign in (shared by passengers, drivers and admins — role comes from the
// profile, not the login form).
// ---------------------------------------------------------------------
import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../lib/AuthProvider';
import { PortalShell, Card, Field, inputClass, btnPrimary, Spinner } from '../components/ui';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PortalShell title="Sign in" onBack={() => navigate('/')}>
      <div className="max-w-sm mx-auto">
        <Card className="p-6">
          {error && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">{error}</div>}
          <form onSubmit={submit} className="space-y-4">
            <Field label="Email"><input type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required /></Field>
            <Field label="Password"><input type="password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
            <button type="submit" disabled={busy} className={btnPrimary + ' w-full'}>
              {busy ? <Spinner className="!border-white/40 !border-t-white" /> : <><LogIn className="w-4 h-4" /> Sign in</>}
            </button>
          </form>
          <p className="text-sm text-brand-grey text-center mt-4">
            New here?{' '}
            <Link to={`/signup?next=${encodeURIComponent(next)}`} className="text-brand-orange font-bold">Create an account</Link>
          </p>
        </Card>
      </div>
    </PortalShell>
  );
}
