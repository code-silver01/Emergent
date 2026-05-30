import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconSparkles, IconPlus } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_BARTERS, SEED_3WAY } from '../lib/mockData';
import { getUser } from '../lib/storage';

const SCORE_LABEL = { very_high: 'Very high', high: 'High', medium: 'Medium' };
const SCORE_COLOR = { very_high: 'var(--moss)', high: 'var(--sky)', medium: 'var(--gold)' };

export default function Barter() {
  const user = getUser();
  const nav = useNavigate();
  const balance = 'Fair';
  return (
    <div className="bg-cream min-h-screen" data-testid="barter-board">
      <PageHeader variant="dark-warm" title="Barter board" subtitle="Trade time, skills, things — without cash" />

      {/* 3 stat row */}
      <section className="px-5 -mt-2">
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Your coins" value={user?.coins ?? 0} accent="gold" />
          <Stat label="Active matches" value={SEED_BARTERS.length} />
          <Stat label="Balance" value={balance} accent="moss" />
        </div>
      </section>

      {/* AI matched */}
      <section className="px-5 mt-7">
        <div className="eyebrow">AI-matched for you</div>
        <div className="space-y-3 mt-3" data-testid="barter-list">
          {SEED_BARTERS.map((b) => (
            <button
              key={b.id}
              data-testid={`barter-card-${b.id}`}
              onClick={() => nav(`/barter/match/${b.id}`)}
              className="card-cream p-4 w-full text-left"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display-i text-[17px]" style={{ color: 'var(--ink)' }}>{b.name}</div>
                  <div className="text-[11.5px]" style={{ color: 'var(--ink2)' }}>Flat {b.flat}</div>
                </div>
                <span className="pill" style={{ background: 'var(--sand2)', color: SCORE_COLOR[b.matchScore] }}>
                  {SCORE_LABEL[b.matchScore]}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-1.5">
                <Row pillLabel="Offers" pillBg="rgba(90,155,92,0.18)" pillColor="var(--moss)" text={b.offers} />
                <Row pillLabel="Wants" pillBg="rgba(184,134,11,0.16)" pillColor="var(--gold)" text={b.wants} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3-way teaser */}
      <section className="px-5 mt-6">
        <div
          className="card-soft p-4"
          style={{ borderLeft: '2px solid var(--rust)' }}
          data-testid="three-way-card"
        >
          <div className="flex items-center gap-1.5">
            <IconSparkles size={13} color="var(--rust)" />
            <span className="eyebrow" style={{ color: 'var(--rust)' }}>3-way barter</span>
          </div>
          <p className="mt-1.5 text-[13.5px] font-display-i" style={{ color: 'var(--ink)' }}>
            "{SEED_3WAY.chain.join(' → ')}. No money. See it?"
          </p>
          <p className="mt-2 text-[12.5px] font-ui" style={{ color: 'var(--ink2)' }}>
            {SEED_3WAY.description}
          </p>
          <button className="btn-rust mt-3 py-2 px-4 text-[13px]" data-testid="see-three-way">See the loop</button>
        </div>
      </section>

      {/* Post */}
      <section className="px-5 mt-6 mb-24">
        <button
          className="w-full p-5 rounded-[12px] text-[13.5px] font-ui flex items-center justify-center gap-2"
          style={{
            border: '1px dashed var(--sand3)',
            color: 'var(--ink2)',
            background: 'transparent'
          }}
          data-testid="post-barter-btn"
        >
          <IconPlus size={15} /> Post what you offer or need
        </button>
        <Link to="/barter/ledger" data-testid="ledger-link" className="block text-center mt-4 text-[12.5px]" style={{ color: 'var(--rust)' }}>
          View coin ledger →
        </Link>
      </section>
    </div>
  );
}

const Stat = ({ label, value, accent }) => (
  <div className="card-cream p-3 text-center">
    <div className="font-display text-[22px]" style={{ color: accent === 'gold' ? 'var(--gold)' : accent === 'moss' ? 'var(--moss)' : 'var(--ink)' }}>
      {value}
    </div>
    <div className="text-[10px] mt-0.5 uppercase tracking-[0.16em]" style={{ color: 'var(--ink2)' }}>{label}</div>
  </div>
);

const Row = ({ pillLabel, pillBg, pillColor, text }) => (
  <div className="flex items-start gap-2">
    <span className="pill shrink-0" style={{ background: pillBg, color: pillColor }}>{pillLabel}</span>
    <span className="text-[13px] pt-0.5" style={{ color: 'var(--ink)' }}>{text}</span>
  </div>
);
