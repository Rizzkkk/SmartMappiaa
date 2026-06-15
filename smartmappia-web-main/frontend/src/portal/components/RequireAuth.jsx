// ---------------------------------------------------------------------
// Route guard. Redirects to /login when signed out; shows a friendly
// "wrong account type" screen when the role doesn't match.
// ---------------------------------------------------------------------
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';
import { PortalShell, Card, Spinner, btnPrimary } from './ui';

function FullScreenSpinner() {
  return (
    <PortalShell title="Loading">
      <div className="flex justify-center py-24"><Spinner className="!w-8 !h-8" /></div>
    </PortalShell>
  );
}

export default function RequireAuth({ role, children }) {
  const { loading, session, role: userRole } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenSpinner />;

  if (!session) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Profile still syncing right after sign-in.
  if (!userRole) return <FullScreenSpinner />;

  if (role && userRole !== role) {
    return (
      <PortalShell title="Wrong account type">
        <div className="max-w-md mx-auto">
          <Card className="p-6 text-center">
            <p className="text-brand-dark font-bold mb-1">This area is for {role}s.</p>
            <p className="text-sm text-brand-grey mb-4">You are signed in as a {userRole}.</p>
            <Link to="/" className={btnPrimary}>Go home</Link>
          </Card>
        </div>
      </PortalShell>
    );
  }

  return children;
}
