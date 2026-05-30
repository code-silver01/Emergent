import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconArrowsRightLeft, IconBadge, IconShieldCheck, IconHexagon } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { getUser, setUser, clearAll } from '../lib/storage';
import { SEED_CONTRIBUTIONS } from '../lib/mockData';

export default function Me() {
  const nav = useNavigate();
  const user = getUser();
  if (!user) return null;

  const toggleRole = () => {
    const nextRole = user.role === 'gig' ? 'resident' : 'gig';
    setUser({
      ...user,
      role: nextRole,
      name: nextRole === 'gig' ? 'Ramesh' : 'Aanya',
      flat: nextRole === 'gig' ? 'D-12' : 'A-302',
      coins: nextRole === 'gig' ? 92 : 140,
      trustScore: nextRole === 'gig' ? 74 : 34
    });
    nav('/home');
    window.location.reload();
  };

  const logout = () => {
    clearAll();
    nav('/');
  };

  return (
    <div className="bg-cream min-h-screen" data-testid="me-screen">
      <PageHeader variant={user.role === 'gig' ? 'moss' : 'ink'} title={user.name} subtitle={`Flat ${user.flat} · ${user.building}`} />

      {/* Trust + percentile */}
      <section className="px-5 pt-6">
        <div className="card-cream p-5 text-center">
          <div className="eyebrow">Your trust score</div>
          <div className="font-display mt-2" style={{ fontSize: 56, color: 'var(--ink)', lineHeight: 1 }}>{user.trustScore}</div>
          <span className="pill mt-3 inline-flex" style={{ background: 'var(--sand2)', color: 'var(--ink2)' }}>
            Top {user.role === 'gig' ? '20%' : '38%'} in Koramangala 4th
          </span>
        </div>
      </section>

      {/* Impact this week */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Your impact this week</div>
        <div className="grid grid-cols-2 gap-2 mt-3" data-testid="impact-grid">
          <Impact label="Coins earned" value={`+${user.coins}`} accent="gold" />
          <Impact label="Money saved" value="₹2,840" accent="moss" />
          <Impact label="Active bartes" value="2" />
          <Impact label="Scams avoided" value="3" accent="alert" />
        </div>
      </section>

      {/* Badges */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Community badges</div>
        <div className="flex flex-wrap gap-2 mt-3" data-testid="badges">
          <Badge Icon={IconShieldCheck} label="Scam Watch" />
          <Badge Icon={IconBadge} label="Contributor" />
          <Badge Icon={IconHexagon} label="Trusted Neighbour" />
        </div>
      </section>

      {/* Contributions */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Recent contributions</div>
        <div className="mt-3 space-y-2" data-testid="contrib-list">
          {SEED_CONTRIBUTIONS.slice(0, 4).map(c => (
            <div key={c.id} className="card-cream p-3 flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-[13px]" style={{ color: 'var(--ink)' }}>{c.description}</p>
                <p className="text-[10.5px] mt-0.5" style={{ color: 'var(--ink2)' }}>{c.timestamp}</p>
              </div>
              <div className="font-display text-[15px]" style={{ color: c.sign === '+' ? 'var(--moss)' : 'var(--alert)' }}>
                {c.sign}{c.coins}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Role toggle */}
      <section className="px-5 mt-7 mb-3">
        <button onClick={toggleRole} className="btn-outline w-full flex items-center justify-center gap-2" data-testid="role-toggle">
          <IconArrowsRightLeft size={15} />
          Switch to {user.role === 'gig' ? 'Resident' : 'Gig'} mode
        </button>
      </section>
      <section className="px-5 mb-12">
        <button onClick={logout} className="btn-ghost w-full text-[13px] flex items-center justify-center gap-1.5" data-testid="logout-btn" style={{ color: 'var(--ink2)' }}>
          <IconLogout size={14} /> Sign out
        </button>
      </section>
    </div>
  );
}

const Impact = ({ label, value, accent }) => {
  const c = accent === 'gold' ? 'var(--gold)' : accent === 'moss' ? 'var(--moss)' : accent === 'alert' ? 'var(--alert)' : 'var(--ink)';
  return (
    <div className="card-cream p-4">
      <div className="font-display text-[24px]" style={{ color: c, lineHeight: 1 }}>{value}</div>
      <div className="text-[10.5px] uppercase tracking-[0.16em] mt-1.5" style={{ color: 'var(--ink2)' }}>{label}</div>
    </div>
  );
};

const Badge = ({ Icon, label }) => (
  <span className="pill hairline flex items-center gap-1" style={{ background: 'var(--sand)' }}>
    <Icon size={12} color="var(--ink)" /> {label}
  </span>
);
