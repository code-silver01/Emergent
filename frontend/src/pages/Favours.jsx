import React from 'react';
import { IconHexagon, IconSparkles } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { FAVOURS } from '../lib/mockData';

export default function Favours() {
  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="favours">
      <PageHeader variant="ink" title="Favour board" subtitle="AI-matched to you specifically — not broadcast" back />

      <section className="px-5 pt-5 space-y-3 stagger">
        {FAVOURS.map(f => (
          <div key={f.id} className="card-white" data-testid={`favour-${f.id}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-ui" style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.45 }}>
                  {f.needed}
                </p>
                <p className="font-ui mt-1" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
                  {f.flat} · Asked {f.askedAgo}
                </p>
              </div>
              <span className="coin-badge" style={{ flexShrink: 0 }}>
                <IconHexagon size={11} stroke={2} color="var(--gold2)" />
                +{f.coinReward}
              </span>
            </div>
            <div
              className="mt-3 px-2.5 py-2 flex items-start gap-1.5"
              style={{ background: 'var(--sand2)', borderRadius: 8 }}
            >
              <IconSparkles size={11} color="var(--moss)" />
              <p className="font-ui" style={{ fontSize: 11.5, color: 'var(--ink2)' }}>{f.aiReason}</p>
            </div>
            <button
              data-testid={`help-${f.id}`}
              className="btn btn-moss mt-3"
              style={{ height: 38, padding: '0 18px', fontSize: 13 }}
            >
              Help out
            </button>
          </div>
        ))}
      </section>

      <section className="px-5 mt-6 mb-10">
        <button
          className="btn btn-outline w-full"
          style={{ height: 46 }}
          data-testid="post-favour"
        >
          I need something →
        </button>
        <p className="font-ui text-center mt-3" style={{ fontSize: 10.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
          You only see this because AI matched you specifically — no broadcasting.
        </p>
      </section>
    </div>
  );
}
