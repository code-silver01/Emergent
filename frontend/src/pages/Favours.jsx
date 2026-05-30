import React from 'react';
import { IconSparkles, IconHexagon } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_FAVOURS } from '../lib/mockData';

export default function Favours() {
  return (
    <div className="bg-cream min-h-screen" data-testid="favours-screen">
      <PageHeader variant="ink" title="Favour board" subtitle="Tiny help, big trust" back />

      <section className="px-5 pt-5">
        <div className="eyebrow">Matched personally to you</div>
        <div className="mt-3 space-y-3" data-testid="favours-list">
          {SEED_FAVOURS.map((f) => (
            <div key={f.id} className="card-cream p-4" data-testid={`favour-${f.id}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-display-i text-[16px]" style={{ color: 'var(--ink)' }}>
                    {f.needed}
                  </div>
                  <div className="text-[12px] mt-0.5" style={{ color: 'var(--ink2)' }}>Flat {f.flat}</div>
                </div>
                <span className="coin-badge shrink-0">
                  <IconHexagon size={11} stroke={2} color="var(--gold2)" />
                  +{f.coinReward}
                </span>
              </div>
              <div className="mt-3 p-2.5 rounded-[8px] flex items-start gap-1.5" style={{ background: 'var(--sand2)' }}>
                <IconSparkles size={12} color="var(--moss)" />
                <p className="text-[12px]" style={{ color: 'var(--ink)' }}>{f.aiMatchReason}</p>
              </div>
              <button className="btn-rust mt-3 w-full py-2.5 text-[13px]" data-testid={`help-${f.id}`}>
                I'll help
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-8 mb-10">
        <p className="text-[11.5px] text-center" style={{ color: 'var(--ink2)' }}>
          You only see this because AI matched you specifically — no broadcasting.
        </p>
      </section>
    </div>
  );
}
