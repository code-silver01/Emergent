import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowsExchange2, IconSparkles, IconPlus } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { BARTERS, THREE_WAY } from '../lib/mockData';
import { loadUser, loadDemo } from '../lib/storage';

const SCORE_LABEL = { very_high: 'Very high match', high: 'High match', medium: 'Medium' };
const SCORE_BG = { very_high: 'var(--moss3)', high: 'var(--sky2)', medium: 'var(--gold3)' };
const SCORE_FG = { very_high: 'var(--moss)', high: 'var(--sky)', medium: 'var(--gold)' };

export default function Barter() {
  const user = loadUser();
  const demo = loadDemo();
  const nav = useNavigate();
  const coins = user?.id === 'aditya' ? demo.adityaCoins : (user?.coins ?? 0);

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="barter-screen">
      <PageHeader variant="dark-warm" title="Barter board" subtitle="Trade time, skills, things — without cash" />

      {/* 3-stat strip */}
      <section className="px-5 -mt-1">
        <div
          className="flex items-stretch"
          style={{
            background: 'var(--sand2)',
            border: '1px solid var(--sand3)',
            borderRadius: 'var(--radius)',
            padding: '10px 0'
          }}
          data-testid="stat-strip"
        >
          <Strip label="Your coins" value={coins} />
          <Sep />
          <Strip label="Matches" value={BARTERS.length} />
          <Sep />
          <Strip label="Balance" value="Fair" accent="moss" />
        </div>
      </section>

      {/* AI matched */}
      <section className="px-5 mt-6">
        <div className="eyebrow">AI-matched for you</div>
        <div className="mt-3 space-y-3 stagger">
          {BARTERS.map(b => (
            <button
              key={b.id}
              onClick={() => nav(`/barter/${b.id}`)}
              data-testid={`barter-${b.id}`}
              className="card-white w-full text-left"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-ui" style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>{b.name}</div>
                  <div className="font-ui" style={{ fontSize: 11, color: 'var(--ink3)' }}>{b.flat}</div>
                </div>
                <span
                  className="pill"
                  style={{ background: SCORE_BG[b.matchScore], color: SCORE_FG[b.matchScore], fontWeight: 600, fontSize: 11 }}
                >
                  {SCORE_LABEL[b.matchScore]}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <PillRow label="Offers" bg="var(--moss3)" fg="var(--moss)" text={b.offers} />
                <PillRow label="Wants" bg="var(--gold3)" fg="var(--gold)" text={b.wants} />
              </div>
              <p className="font-ui mt-3" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
                → see how it works
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3-way */}
      <section className="px-5 mt-5">
        <div
          className="card bl-rust"
          style={{ background: 'var(--rust3)', borderColor: 'var(--rust)' }}
          data-testid="three-way"
        >
          <div className="flex items-center gap-1.5">
            <IconArrowsExchange2 size={14} color="var(--rust)" />
            <span className="font-ui" style={{ fontSize: 13, fontWeight: 600, color: 'var(--rust)' }}>
              I found a 3-way match
            </span>
          </div>
          <p className="font-display-i mt-2" style={{ fontSize: 16, color: 'var(--ink)', lineHeight: 1.3 }}>
            {THREE_WAY.chain.join(' → ')}. No money changes hands.
          </p>
          <p className="font-ui mt-2" style={{ fontSize: 12, color: 'var(--ink2)' }}>
            {THREE_WAY.description}
          </p>
          <button className="btn-ghost mt-3" style={{ color: 'var(--rust)', fontSize: 13 }} data-testid="threeway-cta">
            Show me →
          </button>
        </div>
      </section>

      {/* Post your own */}
      <section className="px-5 mt-5 mb-12">
        <button
          data-testid="post-barter"
          className="w-full font-ui inline-flex items-center justify-center gap-2"
          style={{
            border: '1.5px dashed var(--sand4)',
            borderRadius: 'var(--radius)',
            padding: '18px',
            fontSize: 13.5, color: 'var(--ink3)', fontWeight: 300
          }}
        >
          <IconPlus size={15} /> What do you offer? What do you need?
        </button>
        <button
          onClick={() => nav('/ledger')}
          data-testid="ledger-link"
          className="w-full mt-4 font-ui"
          style={{ fontSize: 12.5, color: 'var(--rust)' }}
        >
          View coin ledger →
        </button>
      </section>
    </div>
  );
}

function Strip({ label, value, accent }) {
  const color = accent === 'moss' ? 'var(--moss)' : 'var(--ink)';
  return (
    <div className="flex-1 text-center">
      <div className="font-display" style={{ fontSize: 22, color, lineHeight: 1 }}>{value}</div>
      <div className="eyebrow mt-1">{label}</div>
    </div>
  );
}
function Sep() {
  return <div style={{ width: 1, background: 'var(--sand3)', margin: '4px 0' }} />;
}
function PillRow({ label, bg, fg, text }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="pill shrink-0"
        style={{ background: bg, color: fg, padding: '3px 10px', fontSize: 10.5, fontWeight: 600 }}
      >
        {label}
      </span>
      <span className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>{text}</span>
    </div>
  );
}
