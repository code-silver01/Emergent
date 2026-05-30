import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconChevronRight, IconSparkles, IconMapSearch, IconArrowsExchange2, IconHandStop,
  IconX, IconCheck, IconHexagon, IconMessage
} from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import AlertStrip from '../components/AlertStrip';
import AiSource from '../components/AiSource';
import CoinBadge from '../components/CoinBadge';
import { loadUser, loadDemo, patchDemo } from '../lib/storage';
import { MOCK_AI } from '../lib/ai';
import { ALERTS, LORE, DEMAND_FORECAST, COLD_START_DATA } from '../lib/mockData';

export default function Home() {
  const user = loadUser();
  if (!user) return null;
  if (user.id === 'sunita' || user.role === 'gig') return <GigHome user={user} />;
  return <ResidentHome user={user} />;
}

function ResidentHome({ user }) {
  const nav = useNavigate();
  const demo = loadDemo();
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const activeAlert = ALERTS.find(a => a.status === 'active');
  const greeting = `Good morning, ${user.name}.`;

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="resident-home">
      <PageHeader
        variant="ink"
        title={greeting}
        subtitle={`${user.building} · ${user.flat} · ${user.neighbourhood}`}
        tall
      />

      {activeAlert && <AlertStrip text="Fake BESCOM inspector active nearby — do not open door" />}

      {welcomeOpen && (
        <section className="px-5 pt-4 fade-up">
          <div
            className="card bl-rust"
            style={{ background: 'var(--rust3)', borderColor: 'var(--rust)' }}
            data-testid="welcome-card"
          >
            <div className="flex items-start justify-between">
              <span className="font-ui" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>
                Since you just moved in…
              </span>
              <button onClick={() => setWelcomeOpen(false)} aria-label="dismiss" data-testid="dismiss-welcome">
                <IconX size={16} color="var(--ink3)" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <Tip emoji="💧" label="Water" sub="7am cut" />
              <Tip emoji="🔧" label="Plumber" sub="Ramesh, 8★" />
              <Tip emoji="🚨" label="Scam" sub="BESCOM fake" />
            </div>
          </div>
        </section>
      )}

      {/* AI Nudge */}
      <section className="px-5 pt-5">
        <div className="eyebrow">For you</div>
        <div className="card bl-moss mt-3" data-testid="ai-nudge">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconSparkles size={13} stroke={1.7} color="var(--moss)" />
            <span className="eyebrow" style={{ color: 'var(--moss)' }}>AI nudge</span>
          </div>
          <p className="font-ui" style={{ fontSize: 13.5, color: 'var(--ink)', lineHeight: 1.55 }}>
            {MOCK_AI.homeNudgeFood}
          </p>
          <div className="mt-2"><AiSource>{MOCK_AI.homeNudgeFoodSource}</AiSource></div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => nav('/map/sunita')}
              data-testid="nudge-yes"
              className="pill"
              style={{ background: 'var(--rust)', color: '#fff', padding: '6px 14px', fontSize: 12 }}
            >
              Tell me more
            </button>
            <button
              data-testid="nudge-no"
              className="pill"
              style={{ background: 'transparent', color: 'var(--ink3)', border: '1px solid var(--sand4)', padding: '6px 14px', fontSize: 12 }}
            >
              Not now
            </button>
          </div>
        </div>
      </section>

      {/* Near you */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Near you</div>
        <div className="mt-3 space-y-3 stagger">
          <DashTile to="/map" emoji="🗺" label="Ghost economy" value="6 discovered nodes" testId="tile-map" />
          <DashTile to="/barter" emoji="⇄" label="Barter board" value="2 open matches" testId="tile-barter" />
          <DashTile to="/favours" emoji="🤝" label="Favour board" value="Drill needed in Flat 203" testId="tile-favours" />
        </div>
      </section>

      {/* Neighbourhood */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Your neighbourhood</div>
        <div className="card-white mt-3" data-testid="health-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display" style={{ fontSize: 48, lineHeight: 1, color: 'var(--ink)' }}>
                74<span style={{ fontSize: 18, color: 'var(--ink3)' }}>/100</span>
              </div>
              <p className="mt-1 font-ui" style={{ fontSize: 12, color: 'var(--ink3)' }}>
                Koramangala · this week
              </p>
            </div>
            {/* Half-circle arc */}
            <svg width="80" height="50" viewBox="0 0 80 50">
              <path d="M10 45 A 30 30 0 0 1 70 45" stroke="var(--sand3)" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M10 45 A 30 30 0 0 1 60 22" stroke="var(--rust)" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      {/* Lore */}
      <section className="px-5 mt-4">
        <div className="card" data-testid="lore-card">
          <div className="eyebrow mb-1.5" style={{ color: 'var(--rust)' }}>Neighbourhood lore</div>
          <p className="font-display-i" style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55 }}>
            {LORE}
          </p>
        </div>
      </section>

      <section className="px-5 mt-4 mb-6">
        <Link to="/snapshot" data-testid="snapshot-link" className="btn btn-outline w-full" style={{ height: 48 }}>
          See this week's snapshot
        </Link>
      </section>
    </div>
  );
}

function Tip({ emoji, label, sub }) {
  return (
    <div className="text-center" style={{ background: '#fff', borderRadius: 10, padding: '8px 4px', border: '1px solid var(--sand3)' }}>
      <div style={{ fontSize: 18 }}>{emoji}</div>
      <div className="font-ui" style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink)', marginTop: 2 }}>{label}</div>
      <div className="font-ui" style={{ fontSize: 9.5, color: 'var(--ink3)' }}>{sub}</div>
    </div>
  );
}

function DashTile({ to, emoji, label, value, testId }) {
  return (
    <Link to={to} data-testid={testId} className="card-white flex items-center gap-4">
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--sand2)', fontSize: 20 }}
      >
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="eyebrow">{label}</div>
        <div className="font-display-i mt-0.5" style={{ fontSize: 17, color: 'var(--ink)' }}>{value}</div>
      </div>
      <IconChevronRight size={16} color="var(--ink3)" />
    </Link>
  );
}

// ----- GIG HOME (Sunita's view) -----
function GigHome({ user }) {
  const nav = useNavigate();
  const demo = loadDemo();
  const [trustShown, setTrustShown] = useState(0);

  useEffect(() => {
    let n = 0;
    const target = user.trustScore || 61;
    const id = setInterval(() => {
      n += Math.max(1, Math.round(target / 24));
      if (n >= target) { setTrustShown(target); clearInterval(id); }
      else setTrustShown(n);
    }, 35);
    return () => clearInterval(id);
  }, [user.trustScore]);

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="gig-home">
      <PageHeader
        variant="moss"
        title={`${user.name}'s reputation`}
        subtitle="Gig mode · trust score carries over"
        tall
      />

      {/* Trust hero */}
      <section className="px-5 -mt-2 mb-2 fade-up">
        <div className="card-white text-center" data-testid="trust-hero">
          <div className="eyebrow">Trust score</div>
          <div className="font-display mt-2" style={{ fontSize: 56, lineHeight: 1, color: 'var(--moss)' }}>
            {trustShown}
          </div>
          <p className="mt-2 font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
            Built from 5 unique household mentions · 3+ months consistent · 0 disputes
          </p>
        </div>
      </section>

      {/* Pending connection — if connection was made by Aditya */}
      {(demo.inviteSent || demo.connectionMade) && (
        <section className="px-5 mt-4 fade-up">
          <div className="card bl-rust" data-testid="pending-connection" style={{ background: 'var(--rust3)', borderColor: 'var(--rust)' }}>
            <div className="eyebrow" style={{ color: 'var(--rust)' }}>New connection</div>
            <p className="mt-1 font-ui" style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>
              Aditya · Flat 504 is interested in tiffin
            </p>
            <p className="mt-1 font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
              He invited you to Mohalla. Tap to chat.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => nav('/jobs')}
                data-testid="accept-connection"
                className="pill"
                style={{ background: 'var(--moss)', color: '#fff', padding: '7px 14px', fontSize: 12.5 }}
              >
                <IconCheck size={12} /> Accept
              </button>
              <button
                data-testid="message-connection"
                className="pill"
                style={{ background: 'transparent', color: 'var(--ink2)', border: '1px solid var(--sand4)', padding: '7px 14px', fontSize: 12.5 }}
              >
                <IconMessage size={12} /> Message
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3-stat row */}
      <section className="px-5 mt-4 grid grid-cols-3 gap-2">
        <Stat label="Mentions" value="5" />
        <Stat label="Jobs done" value="0" />
        <Stat label="Coins" value={user.coins ?? 0} />
      </section>

      {/* Known for */}
      <section className="px-5 mt-6">
        <div className="eyebrow">What you're known for</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {['Home tiffin · 5 mentions', 'South Indian', 'Reliable · watchman-verified'].map(s => (
            <span key={s} className="pill b-sand3" style={{ background: 'var(--sand)' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Demand */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Demand forecast · 7 days</div>
        <div className="card-white mt-3" data-testid="demand-chart">
          <div className="flex items-end gap-1.5" style={{ height: 100 }}>
            {DEMAND_FORECAST.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center justify-end">
                <div
                  style={{
                    width: '100%',
                    height: `${d.value}%`,
                    background: d.high ? 'var(--rust)' : 'var(--sand3)',
                    borderRadius: 4,
                    transition: 'all 240ms ease'
                  }}
                />
                <span className="font-ui mt-1.5" style={{ fontSize: 9.5, color: 'var(--ink3)' }}>{d.day}</span>
              </div>
            ))}
          </div>
          <p className="font-display-i mt-3" style={{ fontSize: 12.5, color: 'var(--ink2)', borderTop: '1px solid var(--sand3)', paddingTop: 8 }}>
            Festival week ahead — design demand typically peaks
          </p>
        </div>
      </section>

      {/* Reputation explainer */}
      <section className="px-5 mt-6">
        <div className="card" style={{ background: 'var(--sand2)' }}>
          <p className="font-display-i" style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.55 }}>
            "Your score is computed from unique household mentions, repeat requests, and completed transactions — not star ratings. It takes time to build, and it's hard to fake."
          </p>
        </div>
      </section>

      <section className="px-5 mt-6 mb-10 grid grid-cols-2 gap-2">
        <button onClick={() => nav('/barter')} className="btn btn-moss" style={{ height: 46 }} data-testid="post-barter-cta">Post a barter</button>
        <button className="btn btn-outline" style={{ height: 46 }} data-testid="set-avail-cta">Set availability</button>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card-white text-center" style={{ padding: '10px 6px' }}>
      <div className="font-display" style={{ fontSize: 22, color: 'var(--ink)' }}>{value}</div>
      <div className="eyebrow mt-1">{label}</div>
    </div>
  );
}
