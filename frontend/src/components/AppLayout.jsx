import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { loadUser } from '../lib/storage';

export default function AppLayout({ hideNav = false }) {
  const user = loadUser();
  if (!user) return <Navigate to="/" replace />;
  const navRole = user.role === 'gig' ? 'gig' : 'resident';

  return (
    <div className="phone-shell" data-testid="app-shell">
      <div style={{ paddingBottom: hideNav ? 0 : 92 }}>
        <Outlet />
      </div>
      {!hideNav && <BottomNav role={navRole} />}
    </div>
  );
}
