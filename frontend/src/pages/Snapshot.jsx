import React from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { getMockAIResponse } from '../lib/ai';

export default function Snapshot() {
  const narrative = getMockAIResponse('snapshot_narrative');

  return (
    <div className="bg-cream min-h-screen" data-testid="snapshot-screen">
      <PageHeader variant="ink" title="Weekly snapshot" subtitle="Your quiet week, narrated" back />

      {/* Narrative */}
      <section className="px-7 pt-10">
        <p className="font-display-i text-center" style={{ fontSize: 22, lineHeight: 1.35, color: 'var(--ink)' }} data-testid="snapshot-narrative">
          "{narrative}"
        </p>
        <p className="text-center mt-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--ink2)' }}>
          Week of 9 — 15 Feb
        </p>
      </section>

      {/* Metric cards */}
      <section className="px-5 mt-10 grid grid-cols-2 gap-3" data-testid="snapshot-metrics">
        <Metric label="Trust score" value="34" delta="↑ 6" />
        <Metric label="Coins earned" value="+28" delta="this week" />
        <Metric label="Money saved" value="₹2,840" delta="vs platforms" />
        <Metric label="Scams avoided" value="3" delta="for 19 neighbours" />
      </section>

      {/* Neighbourhood score */}
      <section className="px-5 mt-7">
        <div className="card-cream p-5">
          <div className="eyebrow">Neighbourhood health</div>
          <div className="mt-2 flex items-end justify-between">
            <div className="font-display" style={{ fontSize: 48, color: 'var(--ink)', lineHeight: 1 }}>
              72<span className="text-[16px]" style={{ color: 'var(--ink2)' }}>/100</span>
            </div>
            <span className="pill" style={{ background: 'rgba(90,155,92,0.18)', color: 'var(--moss)' }}>↑ 4 pts</span>
          </div>
        </div>
      </section>

      <section className="px-5 mt-7 mb-12">
        <button className="btn-rust w-full flex items-center justify-center gap-2" data-testid="share-whatsapp">
          <IconBrandWhatsapp size={17} /> Share to WhatsApp
        </button>
      </section>
    </div>
  );
}

const Metric = ({ label, value, delta }) => (
  <div className="card-cream p-4">
    <div className="font-display" style={{ fontSize: 28, color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
    <div className="text-[10.5px] uppercase tracking-[0.16em] mt-2" style={{ color: 'var(--ink2)' }}>{label}</div>
    <div className="text-[10.5px] mt-1" style={{ color: 'var(--moss)' }}>{delta}</div>
  </div>
);
