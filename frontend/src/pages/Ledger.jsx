import React from 'react';
import { IconHexagon } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { loadUser, loadDemo } from '../lib/storage';

const SPEND = [
  { id: 's1', description: 'Barter debt · Sunita tiffin (3 days)', coins: 12, timestamp: '4d ago' }
];

const USES = [
  'Barter credits — settle uneven trades without cash',
  'Credibility badge — unlocks gig worker visibility boost',
  'Ghost node unlocks — see hidden nodes 2km out',
  'Donate to neighbourhood fund — civic projects'
];

export default function Ledger() {
  const user = loadUser();
  const demo = loadDemo();
  const coins = user?.id === 'aditya' ? demo.adityaCoins : (user?.coins ?? 0);
  const earned = demo.adityaContributions || [];

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="ledger">
      <PageHeader variant="dark-warm" title="Coin ledger" subtitle="Earned by contributing. Spent by trading." back showCoins={false} />

      {/* Balance */}
      <section className="px-5 pt-6 text-center">
        <div className="eyebrow" style={{ color: 'var(--gold)' }}>Your balance</div>
        <div className="font-display mt-2 inline-flex items-center gap-3" style={{ fontSize: 64, color: 'var(--gold)', lineHeight: 1 }}>
          <IconHexagon size={32} stroke={1.6} />
          {coins}
        </div>
        <p className="mt-1 font-ui" style={{ fontSize: 12, color: 'var(--ink3)' }}>mohalla coins</p>
      </section>

      {/* Earned */}
      <section className="px-5 mt-8">
        <div className="eyebrow">Earned · contributions</div>
        <div className="mt-3 space-y-2">
          {earned.length === 0 ? (
            <p className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
              No contributions yet — share something about your neighbourhood to earn coins.
            </p>
          ) : (
            earned.map((c, i) => (
              <div key={i} className="card-white flex items-center justify-between" data-testid={`earn-${i}`}>
                <div className="flex-1 min-w-0 pr-3">
                  <div className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>{c.description}</div>
                  <div className="font-ui" style={{ fontSize: 10.5, color: 'var(--ink3)' }}>{c.timestamp}</div>
                </div>
                <div className="font-display" style={{ fontSize: 16, color: 'var(--moss)' }}>+{c.coins}</div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Spent */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Spent · barter debts</div>
        <div className="mt-3 space-y-2">
          {SPEND.map(c => (
            <div key={c.id} className="card-white flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <div className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>{c.description}</div>
                <div className="font-ui" style={{ fontSize: 10.5, color: 'var(--ink3)' }}>{c.timestamp}</div>
              </div>
              <div className="font-display" style={{ fontSize: 16, color: 'var(--alert)' }}>−{c.coins}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-7 mb-12">
        <div className="card">
          <div className="eyebrow" style={{ color: 'var(--gold)' }}>Spend coins on</div>
          <ul className="mt-2 space-y-1.5">
            {USES.map((u, i) => (
              <li key={i} className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink2)' }}>· {u}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
