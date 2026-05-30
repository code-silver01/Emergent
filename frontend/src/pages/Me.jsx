import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconArrowsRightLeft, IconLock, IconRefresh } from '@tabler/icons-react';
import { loadUser, saveUser, logoutUser, loadDemo, fullReset } from '../lib/storage';

export default function Me() {
  const nav = useNavigate();
  const user = loadUser();
  const demo = loadDemo();
  if (!user) return null;

  const isAditya = user.id === 'aditya';
  const coins = isAditya ? demo.adityaCoins : (user.coins ?? 0);

  const toggleRole = () => {
    const nextRole = user.role === 'gig' ? 'resident' : (user.role === 'resident' ? 'gig' : 'gig');
    saveUser({ ...user, role: nextRole });
    window.location.reload();
  };

  const logout = () => {
    logoutUser();
    nav('/');
  };

  const reset = () => {
    fullReset();
    nav('/');
  };

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="me">
      {/* Top — sand2 bg, no dark header */}
      <section className="px-5 pt-8" style={{ background: 'var(--sand2)', paddingBottom: 20 }}>
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center"
            style={{
              width: 64, height: 64, borderRadius: 99,
              background: user.id === 'sunita' ? 'var(--moss)' : 'var(--rust)',
              color: '#fff', fontFamily: 'Fraunces', fontSize: 30, fontWeight: 500
            }}
          >
            {user.name[0]}
          </div>
          <div>
            <h1 className="font-ui" style={{ fontSize: 22, fontWeight: 600, color: 'var(--ink)' }}>{user.name}</h1>
            <p className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink3)', fontWeight: 300 }}>
              {user.flat} · {user.building}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {(user.role === 'resident' || user.role === 'both') && (
            <span className="pill" style={{ background: 'var(--rust3)', color: 'var(--rust)', fontSize: 11 }}>Resident</span>
          )}
          {(user.role === 'gig' || user.role === 'both') && (
            <span className="pill" style={{ background: 'var(--moss3)', color: 'var(--moss)', fontSize: 11 }}>Gig</span>
          )}
        </div>
      </section>

      {/* Impact */}
      <section className="px-5 pt-6">
        <div className="eyebrow">Impact this week</div>
        <div className="grid grid-cols-2 gap-3 mt-3" data-testid="impact-grid">
          <Impact emoji="🟡" label="Coins earned" value={`+${coins}`} accent="gold" />
          <Impact emoji="💰" label="Saved vs apps" value={isAditya && coins === 0 ? '₹0 · building…' : '₹2,840'} accent="moss" />
          <Impact emoji="🔄" label="Active barters" value="0" />
          <Impact emoji="🛡" label="Scams avoided" value="1" accent="alert" />
        </div>
      </section>

      {/* Trust score */}
      <section className="px-5 mt-6">
        <div className="card-white text-center">
          <div className="eyebrow">Your trust score</div>
          <div className="font-display mt-2" style={{ fontSize: 56, color: 'var(--ink)', lineHeight: 1 }}>
            {user.trustScore}
          </div>
          <p className="font-ui mt-2" style={{ fontSize: 11.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
            {user.trustScore === 0 ? 'Everyone starts here. It builds from real contributions.' : 'Top 38% in Koramangala'}
          </p>
        </div>
      </section>

      {/* Contributions */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Contribution history</div>
        <div className="mt-3 space-y-2" data-testid="contribs">
          {(demo.adityaContributions || []).length === 0 ? (
            <p className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
              Share a tip, recommend a neighbour — your first 5 coins are 30 seconds away.
            </p>
          ) : (
            demo.adityaContributions.map((c, i) => (
              <div
                key={i}
                className="card-white"
                style={{ borderLeft: '2.5px solid var(--rust)' }}
              >
                <p className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>{c.description}</p>
                <p className="font-ui mt-1" style={{ fontSize: 10.5, color: 'var(--ink3)' }}>
                  +{c.coins} coins · Now discoverable by 34 neighbours
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Badges */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Community badges</div>
        <div className="flex flex-wrap gap-2 mt-3" data-testid="badges">
          <Badge label="New Arrival 🌱" earned />
          <Badge label="Scam Watch" />
          <Badge label="Trusted Neighbour" />
          <Badge label="Contributor" />
        </div>
      </section>

      {/* Footer */}
      <section className="px-5 mt-8 mb-12 space-y-3">
        <button onClick={toggleRole} className="btn btn-outline w-full" style={{ height: 44 }} data-testid="role-toggle">
          <IconArrowsRightLeft size={14} /> Switch role
        </button>
        <button onClick={logout} className="btn-ghost w-full font-ui inline-flex items-center justify-center gap-1.5" data-testid="logout" style={{ fontSize: 13, color: 'var(--ink3)' }}>
          <IconLogout size={13} /> Log out
        </button>
        <button onClick={reset} className="btn-ghost w-full font-ui inline-flex items-center justify-center gap-1.5" data-testid="reset-demo" style={{ fontSize: 12, color: 'var(--alert)' }}>
          <IconRefresh size={12} /> Reset entire demo
        </button>
      </section>
    </div>
  );
}

function Impact({ emoji, label, value, accent }) {
  const c = accent === 'gold' ? 'var(--gold)' : accent === 'moss' ? 'var(--moss)' : accent === 'alert' ? 'var(--alert)' : 'var(--ink)';
  return (
    <div className="card-white">
      <div style={{ fontSize: 18 }}>{emoji}</div>
      <div className="font-display mt-1" style={{ fontSize: 22, color: c, lineHeight: 1 }}>{value}</div>
      <div className="eyebrow mt-1">{label}</div>
    </div>
  );
}

function Badge({ label, earned }) {
  return (
    <span
      className="pill"
      style={{
        background: earned ? 'var(--sand)' : 'transparent',
        color: earned ? 'var(--ink)' : 'var(--ink3)',
        border: earned ? '1px solid var(--sand4)' : '1px dashed var(--sand4)',
        opacity: earned ? 1 : 0.55
      }}
    >
      {!earned && <IconLock size={10} stroke={1.8} />} {label}
    </span>
  );
}
