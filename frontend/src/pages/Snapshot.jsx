import React from 'react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';

export default function Snapshot() {
  const narrative = "This week, you arrived in a new neighbourhood, earned your first coins by sharing what you saw, and helped one neighbour avoid a scam. Quiet, but you did real work.";

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="snapshot">
      <PageHeader variant="ink" title="Weekly snapshot" subtitle="Your quiet week, narrated" back />

      <section className="px-7 pt-10">
        <p
          className="font-display-i text-center"
          style={{ fontSize: 22, lineHeight: 1.35, color: 'var(--ink)' }}
          data-testid="snapshot-narrative"
        >
          "{narrative}"
        </p>
        <p className="text-center mt-4 eyebrow">Week of 9 — 15 Feb</p>
      </section>

      <section className="px-5 mt-10 grid grid-cols-2 gap-3 stagger" data-testid="metrics">
        <Metric label="Trust score" value="0 → 8" delta="growing" />
        <Metric label="Coins earned" value="+8" delta="this week" />
        <Metric label="Money saved" value="₹0" delta="builds with bartes" />
        <Metric label="Scams avoided" value="1" delta="BESCOM fake" />
      </section>

      <section className="px-5 mt-8">
        <div className="card-white">
          <div className="eyebrow">Neighbourhood health</div>
          <div className="mt-2 flex items-end justify-between">
            <div className="font-display" style={{ fontSize: 44, color: 'var(--ink)', lineHeight: 1 }}>
              74<span style={{ fontSize: 16, color: 'var(--ink3)' }}>/100</span>
            </div>
            <span className="pill" style={{ background: 'var(--moss3)', color: 'var(--moss)' }}>↑ 4 pts</span>
          </div>
        </div>
      </section>

      <section className="px-5 mt-7 mb-12">
        <button className="btn btn-rust w-full" data-testid="share-whatsapp" style={{ height: 48 }}>
          <IconBrandWhatsapp size={17} /> Share to WhatsApp
        </button>
      </section>
    </div>
  );
}

function Metric({ label, value, delta }) {
  return (
    <div className="card-white">
      <div className="font-display" style={{ fontSize: 26, color: 'var(--ink)', lineHeight: 1 }}>{value}</div>
      <div className="eyebrow mt-2">{label}</div>
      <div className="font-ui mt-1" style={{ fontSize: 10.5, color: 'var(--moss)' }}>{delta}</div>
    </div>
  );
}
