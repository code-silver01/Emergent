import React from 'react';
import { getUser } from '../lib/storage';
import ResidentDashboard from './ResidentDashboard';
import GigDashboard from './GigDashboard';

export default function Home() {
  const user = getUser();
  if (!user) return null;
  return user.role === 'gig' ? <GigDashboard /> : <ResidentDashboard />;
}
