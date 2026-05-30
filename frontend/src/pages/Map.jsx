import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AlertStrip from '../components/AlertStrip';
import { SEED_NODES, CATEGORY_META, SEED_ALERTS } from '../lib/mockData';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'repair', label: 'Repair' },
  { id: 'tutor', label: 'Tutor' },
  { id: 'design', label: 'Design' },
  { id: 'tailor', label: 'Tailoring' },
  { id: 'vehicle', label: 'Vehicles' }
];

export default function MapPage() {
  const nav = useNavigate();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const activeAlert = SEED_ALERTS.find(a => a.status === 'active');

  const nodes = useMemo(() => {
    return filter === 'all' ? SEED_NODES : SEED_NODES.filter(n => n.category === filter);
  }, [filter]);

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--cream)' }} data-testid="map-screen">
      <PageHeader
        variant="ink"
        title="Ghost economy, 1km"
        subtitle="AI-discovered · nobody listed these"
      />

      {activeAlert && <AlertStrip text="Fake BESCOM inspector near you — do not open door" />}

      {/* Filter pills */}
      <div className="px-4 py-3 hairline-b">
        <div className="flex gap-2 overflow-x-auto no-scrollbar" data-testid="map-filters">
          {FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                data-testid={`filter-${f.id}`}
                onClick={() => setFilter(f.id)}
                className="pill whitespace-nowrap"
                style={{
                  background: active ? 'var(--ink)' : 'var(--cream)',
                  color: active ? 'var(--cream)' : 'var(--ink2)',
                  border: active ? 'none' : '0.5px solid var(--sand3)'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="map-grid relative flex-1" style={{ minHeight: 380 }} data-testid="map-area">
        {/* You are here */}
        <div className="absolute" style={{ left: '46%', top: '48%' }}>
          <div className="you-here" />
          <div className="text-[10px] mt-1.5 text-center font-medium" style={{ color: 'var(--rust)' }}>You</div>
        </div>

        {nodes.map((n) => {
          const meta = CATEGORY_META[n.category];
          const isSel = selected?.id === n.id;
          return (
            <button
              key={n.id}
              data-testid={`node-${n.id}`}
              onClick={() => setSelected(n)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${n.pos.x}%`, top: `${n.pos.y}%` }}
            >
              <div
                className="rounded-full flex items-center justify-center transition-transform"
                style={{
                  width: 30, height: 30,
                  background: meta.color,
                  border: '2px solid var(--cream)',
                  boxShadow: isSel ? `0 0 0 4px ${meta.color}33` : 'none',
                  transform: isSel ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                <span className="text-[12px]" style={{ color: 'var(--cream)' }}>•</span>
              </div>
              <span
                className="text-[10px] mt-1 px-1.5 py-0.5 rounded-[6px]"
                style={{ background: 'var(--cream)', color: 'var(--ink)', border: '0.5px solid var(--sand3)' }}
              >
                {n.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Peek card */}
      <div className="px-4 pt-3 pb-2 hairline-t" data-testid="peek-card">
        {selected ? (
          <div
            className="card-cream p-4 cursor-pointer fade-up"
            onClick={() => nav(`/map/${selected.id}`)}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display-i text-[18px]" style={{ color: 'var(--ink)' }}>{selected.title}</div>
                <div className="text-[12px] mt-0.5" style={{ color: 'var(--ink2)' }}>
                  {CATEGORY_META[selected.category].label} · {selected.location}
                </div>
              </div>
              <span className="pill" style={{ background: 'var(--sand2)', color: 'var(--ink)' }}>
                Trust {selected.trustScore}
              </span>
            </div>
            <div className="hairline-t mt-3 pt-2 flex items-center justify-between text-[11px]">
              <span style={{ color: 'var(--ink2)' }}>{selected.mentions} mentions this week</span>
              <span style={{ color: 'var(--rust)' }}>Open profile →</span>
            </div>
          </div>
        ) : (
          <p className="text-[12.5px] font-ui text-center py-3" style={{ color: 'var(--ink2)' }}>
            Tap any node to peek. None of these advertised — AI just kept hearing their names.
          </p>
        )}
      </div>
    </div>
  );
}
