import React from 'react';
import { Link } from 'react-router-dom';
import { IconSparkles, IconCheck, IconX, IconChevronRight } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { getUser } from '../lib/storage';
import { getMockAIResponse } from '../lib/ai';
import { SEED_JOBS, DEMAND_FORECAST } from '../lib/mockData';

export default function GigDashboard() {
  const user = getUser();
  const pending = SEED_JOBS.slice(0, 2);

  return (
    <div className="bg-cream min-h-screen" data-testid="gig-home">
      <PageHeader
        variant="moss"
        title={`${user.name}'s reputation`}
        subtitle={`Trust ${user.trustScore} · ↑ 4 this week · Top 20%`}
      />

      {/* Trust hero */}
      <section className="px-5 pt-6">
        <div className="card-cream p-5 flex items-end justify-between" data-testid="trust-hero">
          <div>
            <div className="eyebrow">Trust score</div>
            <div className="font-display mt-1" style={{ fontSize: 56, lineHeight: 1, color: 'var(--ink)' }}>
              {user.trustScore}
            </div>
            <p className="mt-1 text-[12px] font-ui" style={{ color: 'var(--ink2)' }}>
              Built from 11 mentions across 3 building groups
            </p>
          </div>
          <div className="text-right">
            <span className="pill" style={{ background: 'rgba(90,155,92,0.18)', color: 'var(--moss)' }}>↑ 4 this wk</span>
            <div className="text-[10.5px] mt-2" style={{ color: 'var(--ink2)' }}>Top 20% in Koramangala</div>
          </div>
        </div>
      </section>

      {/* 3 stat row */}
      <section className="px-5 mt-4 grid grid-cols-3 gap-2">
        <Stat label="Mentions" value="11" />
        <Stat label="Pending jobs" value={pending.length} />
        <Stat label="Coins earned" value={user.coins} />
      </section>

      {/* Demand forecast */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Demand forecast · 7 days</div>
        <div className="card-cream mt-3 p-4" data-testid="demand-chart">
          <div className="flex items-end justify-between gap-1.5" style={{ height: 110 }}>
            {DEMAND_FORECAST.map((d) => (
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
                <span className="text-[10px] mt-1.5" style={{ color: 'var(--ink2)' }}>{d.day}</span>
              </div>
            ))}
          </div>
          <div className="hairline-t mt-3 pt-3 flex items-center gap-1.5">
            <IconSparkles size={12} color="var(--rust)" />
            <p className="text-[12px] font-ui" style={{ color: 'var(--ink)' }}>
              Festival week → 3× demand Thu–Fri
            </p>
          </div>
        </div>
      </section>

      {/* What you're known for */}
      <section className="px-5 mt-6">
        <div className="eyebrow">What you're known for</div>
        <div className="flex flex-wrap gap-2 mt-3" data-testid="skills-chips">
          {['AC repair · 8 mentions', 'Inverter wiring · 3', 'Honest pricing · 6'].map((s) => (
            <span key={s} className="pill hairline" style={{ background: 'var(--sand)' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Job queue */}
      <section className="px-5 mt-6">
        <div className="flex items-center justify-between">
          <div className="eyebrow">Pending jobs</div>
          <Link to="/jobs" className="text-[11.5px]" style={{ color: 'var(--rust)' }}>See all <IconChevronRight size={12} className="inline" /></Link>
        </div>
        <div className="mt-3 space-y-3">
          {pending.map((j) => (
            <div key={j.id} className="card-cream p-4" data-testid={`job-card-${j.id}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display-i text-[16px]" style={{ color: 'var(--ink)' }}>{j.requester}, Flat {j.requesterFlat}</div>
                  <p className="text-[13px] mt-0.5 font-ui" style={{ color: 'var(--ink2)' }}>{j.jobType}</p>
                </div>
                <span className="pill" style={{ background: j.urgency === 'Today' ? 'rgba(192,57,43,0.12)' : 'var(--sand2)', color: j.urgency === 'Today' ? 'var(--alert)' : 'var(--ink2)' }}>
                  {j.urgency}
                </span>
              </div>
              <p className="text-[11px] mt-2" style={{ color: 'var(--ink2)' }}>
                Found you {j.foundVia}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="btn-rust flex-1 py-2.5 text-[13px]" data-testid={`accept-${j.id}`}><IconCheck size={14} className="inline mr-1" /> Accept</button>
                <button className="btn-outline flex-1 py-2.5 text-[13px]" data-testid={`pass-${j.id}`}><IconX size={14} className="inline mr-1" /> Pass</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active barter */}
      <section className="px-5 mt-6 mb-10">
        <div className="eyebrow">Your barter offer</div>
        <div className="card-cream mt-3 p-4" data-testid="active-barter">
          <p className="text-[13px] font-ui" style={{ color: 'var(--ink2)' }}>
            <span style={{ color: 'var(--moss)', fontWeight: 500 }}>Offering</span> · 1 AC service
            <br /><span style={{ color: 'var(--gold)', fontWeight: 500 }}>Wanting</span> · Hindi tuition for 5-yr-old, twice a week
          </p>
          <p className="text-[11px] mt-3" style={{ color: 'var(--ink2)' }}>2 residents matched. Tap barter tab to chat.</p>
        </div>
      </section>
    </div>
  );
}

const Stat = ({ label, value }) => (
  <div className="card-cream p-3 text-center">
    <div className="font-display text-[22px]" style={{ color: 'var(--ink)' }}>{value}</div>
    <div className="text-[10px] uppercase tracking-[0.16em] mt-0.5" style={{ color: 'var(--ink2)' }}>{label}</div>
  </div>
);
