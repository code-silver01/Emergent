import React from 'react';
import { IconHexagon } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_CONTRIBUTIONS, COIN_USES } from '../lib/mockData';
import { getUser } from '../lib/storage';

export default function Ledger() {
  const user = getUser();
  const earned = SEED_CONTRIBUTIONS.filter(c => c.sign === '+');
  const spent = SEED_CONTRIBUTIONS.filter(c => c.sign === '-');

  return (
    <div className="bg-cream min-h-screen" data-testid="ledger-screen">
      <PageHeader variant="dark-warm" title="Coin ledger" subtitle="Earned by contributing. Spent by trading." back />

      {/* Balance */}
      <section className="px-5 pt-6 text-center" data-testid="ledger-balance">
        <div className="eyebrow" style={{ color: 'var(--gold)' }}>Your balance</div>
        <div className="font-display mt-2 inline-flex items-center gap-3" style={{ fontSize: 72, color: 'var(--gold)', lineHeight: 1 }}>
          <IconHexagon size={36} stroke={1.6} />
          {user?.coins ?? 0}
        </div>
        <p className="text-[12px] mt-2" style={{ color: 'var(--ink2)' }}>mohalla coins</p>
      </section>

      {/* Earned */}
      <section className="px-5 mt-8">
        <div className="eyebrow">Earned · contributions</div>
        <div className="mt-3 space-y-2" data-testid="earned-list">
          {earned.map((c) => (
            <div key={c.id} className="card-cream p-3 flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <div className="text-[13px] font-ui" style={{ color: 'var(--ink)' }}>{c.description}</div>
                <div className="text-[10.5px] mt-0.5" style={{ color: 'var(--ink2)' }}>{c.timestamp}</div>
              </div>
              <div className="font-display text-[16px]" style={{ color: 'var(--moss)' }}>+{c.coins}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Spent */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Spent · barter debts</div>
        <div className="mt-3 space-y-2" data-testid="spent-list">
          {spent.map((c) => (
            <div key={c.id} className="card-cream p-3 flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <div className="text-[13px] font-ui" style={{ color: 'var(--ink)' }}>{c.description}</div>
                <div className="text-[10.5px] mt-0.5" style={{ color: 'var(--ink2)' }}>{c.timestamp}</div>
              </div>
              <div className="font-display text-[16px]" style={{ color: 'var(--alert)' }}>−{c.coins}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Uses */}
      <section className="px-5 mt-7 mb-10">
        <div className="card-soft p-4">
          <div className="eyebrow mb-2" style={{ color: 'var(--gold)' }}>Spend coins on</div>
          <ul className="space-y-1.5">
            {COIN_USES.map((u, i) => (
              <li key={i} className="text-[13px] font-ui" style={{ color: 'var(--ink)' }}>
                · {u}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
