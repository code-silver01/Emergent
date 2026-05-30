import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { getUser } from '../lib/storage';

export default function AppLayout({ hideNav = false }) {
  const user = getUser();
  if (!user) return <Navigate to="/" replace />;

  return (
    <div className="phone-shell" data-testid="app-shell">
      <div style={{ paddingBottom: hideNav ? 0 : 86 }}>
        <Outlet />
      </div>
      {!hideNav && <BottomNav role={user.role === 'gig' ? 'gig' : 'resident'} />}
    </div>
  );
}
