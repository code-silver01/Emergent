import React from 'react';
import { Link } from 'react-router-dom';
import { IconChevronRight, IconSparkles, IconMapSearch, IconArrowsExchange2, IconHandStop } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import AlertStrip from '../components/AlertStrip';
import { getUser } from '../lib/storage';
import { getMockAIResponse } from '../lib/ai';
import { SEED_ALERTS, LORE_SNIPPETS } from '../lib/mockData';

export default function ResidentDashboard() {
  const user = getUser();
  const activeAlert = SEED_ALERTS.find(a => a.status === 'active');
  const lore = LORE_SNIPPETS[0];

  return (
    <div className="bg-cream min-h-screen" data-testid="resident-home">
      <PageHeader
        variant="ink"
        title={`Good evening, ${user.name}.`}
        subtitle={`${user.building} · 184 neighbours`}
      />

      {activeAlert && (
        <AlertStrip text={`Fake BESCOM inspector near you — do not open door`} />
      )}

      {/* AI nudge */}
      <section className="px-5 pt-6">
        <div className="eyebrow">For you today</div>
        <div className="card-soft mt-3 p-4" style={{ borderLeft: '2px solid var(--moss)' }} data-testid="ai-nudge">
          <div className="flex items-center gap-1.5 mb-1.5">
            <IconSparkles size={13} stroke={1.7} color="var(--moss)" />
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--moss)' }}>AI nudge</span>
          </div>
          <p className="text-[13.5px] font-ui leading-relaxed" style={{ color: 'var(--ink)' }}>
            {getMockAIResponse('home_nudge_resident')}
          </p>
          <Link to="/map/n1" className="mt-3 inline-flex items-center text-[12px] font-medium" style={{ color: 'var(--rust)' }}>
            Introduce me to Sunita <IconChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Quick tiles */}
      <section className="px-5 mt-5 grid grid-cols-1 gap-3">
        <DashTile to="/map" Icon={IconMapSearch} label="Ghost economy" value="6 nodes near you" hint="AI surfaced" testId="tile-map" />
        <DashTile to="/barter" Icon={IconArrowsExchange2} label="Barter board" value="1 match waiting" hint="Very high score" testId="tile-barter" />
        <DashTile to="/favours" Icon={IconHandStop} label="Favour board" value="2 open" hint="Personally matched" testId="tile-favours" />
      </section>

      {/* Neighbourhood */}
      <section className="px-5 mt-8">
        <div className="eyebrow">Neighbourhood</div>
        <div className="card-cream mt-3 p-5" data-testid="health-score">
          <div className="flex items-end justify-between">
            <div>
              <div className="font-display" style={{ fontSize: 52, lineHeight: 1, color: 'var(--ink)' }}>
                72<span className="text-[18px]" style={{ color: 'var(--ink2)' }}>/100</span>
              </div>
              <p className="mt-1 text-[12px] font-ui" style={{ color: 'var(--ink2)' }}>
                Koramangala 4th · this week
              </p>
            </div>
            <span className="pill" style={{ background: 'rgba(90,155,92,0.15)', color: 'var(--moss)' }}>
              ↑ 4 pts
            </span>
          </div>
          <div className="hairline-t mt-4 pt-3 text-[11.5px] font-ui" style={{ color: 'var(--ink2)' }}>
            Health = trust × activity × scams blocked × civic actions.
          </div>
        </div>
      </section>

      {/* Lore */}
      <section className="px-5 mt-5 mb-6">
        <div className="card-soft p-4" data-testid="lore-card">
          <div className="eyebrow mb-1.5" style={{ color: 'var(--rust)' }}>Neighbourhood lore</div>
          <p className="font-display-i text-[15px] leading-snug" style={{ color: 'var(--ink)' }}>
            {lore}
          </p>
        </div>
      </section>

      <section className="px-5 mb-10">
        <Link to="/snapshot" className="btn-outline w-full inline-flex items-center justify-center" data-testid="weekly-snapshot-link">
          See this week's snapshot
        </Link>
      </section>
    </div>
  );
}

const DashTile = ({ to, Icon, label, value, hint, testId }) => (
  <Link to={to} data-testid={testId} className="card-cream p-4 flex items-center gap-4">
    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: 'var(--sand2)' }}>
      <Icon size={20} stroke={1.6} color="var(--ink)" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink2)' }}>{label}</div>
      <div className="font-display-i text-[18px]" style={{ color: 'var(--ink)' }}>{value}</div>
    </div>
    <div className="flex flex-col items-end gap-1">
      <span className="text-[10.5px]" style={{ color: 'var(--moss)' }}>{hint}</span>
      <IconChevronRight size={16} color="var(--ink2)" />
    </div>
  </Link>
);
