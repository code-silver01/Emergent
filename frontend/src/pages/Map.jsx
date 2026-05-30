import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconQuestionMark, IconChevronRight } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import AlertStrip from '../components/AlertStrip';
import { NODES, RESOURCES, CATEGORY_META, ALERTS } from '../lib/mockData';
import { loadDemo } from '../lib/storage';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'food', label: 'Food' },
  { id: 'repair', label: 'Repair' },
  { id: 'tutor', label: 'Tutor' },
  { id: 'design', label: 'Design' },
  { id: 'tailor', label: 'Tailoring' },
  { id: 'vehicle', label: 'Vehicles' },
  { id: 'resource', label: 'Resources' }
];

export default function MapPage() {
  const nav = useNavigate();
  const demo = loadDemo();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [tip, setTip] = useState(false);
  const activeAlert = ALERTS.find(a => a.status === 'active');

  // After Sunita claims, her node becomes 'claimed'
  const nodesWithStatus = useMemo(() => NODES.map(n => {
    if (n.id === 'sunita' && demo.sunitaClaimed) {
      return { ...n, status: 'claimed' };
    }
    return n;
  }), [demo.sunitaClaimed]);

  const visibleNodes = useMemo(() => {
    if (filter === 'all') return nodesWithStatus;
    if (filter === 'resource') return [];
    return nodesWithStatus.filter(n => n.category === filter);
  }, [filter, nodesWithStatus]);

  const visibleResources = filter === 'all' || filter === 'resource' ? RESOURCES : [];

  return (
    <div className="flex flex-col" style={{ minHeight: '100vh', background: 'var(--cream)' }} data-testid="map-screen">
      <PageHeader
        variant="ink"
        title="Ghost economy"
        subtitle="AI-discovered · 1km radius · nobody listed these"
        right={
          <button
            onClick={() => setTip(!tip)}
            data-testid="map-help"
            style={{
              width: 22, height: 22, borderRadius: 99,
              border: '1px solid rgba(244,237,224,0.4)', color: 'var(--sand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <IconQuestionMark size={13} stroke={2} />
          </button>
        }
      />

      {tip && (
        <div className="px-5 py-2 fade-up" style={{ background: 'var(--sky2)', borderBottom: '1px solid var(--sand3)' }}>
          <p className="font-ui" style={{ fontSize: 11.5, color: 'var(--ink2)', lineHeight: 1.4 }}>
            These people were found through community mentions, not self-registration. Shadow nodes are anonymised until they claim.
          </p>
        </div>
      )}

      {activeAlert && <AlertStrip text="Fake BESCOM inspector active nearby — do not open door" />}

      {/* Filter pills */}
      <div className="bb-sand3" style={{ background: '#fff' }}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" data-testid="filters">
          {FILTERS.map(f => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                data-testid={`filter-${f.id}`}
                onClick={() => setFilter(f.id)}
                className="pill"
                style={{
                  whiteSpace: 'nowrap',
                  background: active ? 'var(--rust)' : 'var(--sand2)',
                  color: active ? '#fff' : 'var(--ink2)',
                  border: active ? 'none' : '1px solid var(--sand4)',
                  padding: '5px 14px',
                  fontSize: 12
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Map canvas */}
      <div className="map-canvas flex-1" style={{ minHeight: 360 }} data-testid="map-canvas">
        {/* You */}
        <div className="absolute" style={{ left: '46%', top: '48%', transform: 'translate(-50%,-50%)', zIndex: 5 }}>
          <div className="you-here" />
          <div
            className="font-ui mt-1.5 text-center"
            style={{ fontSize: 8.5, fontWeight: 600, color: 'var(--rust)', whiteSpace: 'nowrap' }}
          >
            YOUR BUILDING
          </div>
        </div>

        {/* Resource pins */}
        {visibleResources.map((r, i) => (
          <button
            key={r.id}
            data-testid={`resource-${r.id}`}
            className="absolute node-pop"
            style={{
              left: `${r.pos.x}%`, top: `${r.pos.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 50}ms`,
              zIndex: 2
            }}
            onClick={() => setSelected({ id: r.id, kind: 'resource', name: r.label, flat: r.flat, emoji: r.emoji })}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 26, height: 26, borderRadius: 8,
                background: '#fff', border: '1.5px dashed var(--ink2)', fontSize: 13
              }}
            >
              {r.emoji}
            </div>
          </button>
        ))}

        {/* Nodes */}
        {visibleNodes.map((n, i) => {
          const meta = CATEGORY_META[n.category];
          const isSel = selected?.id === n.id;
          const isShadow = n.status === 'shadow';
          return (
            <button
              key={n.id}
              data-testid={`node-${n.id}`}
              onClick={() => setSelected({ id: n.id, kind: 'node', node: n })}
              className="absolute node-pop flex flex-col items-center"
              style={{
                left: `${n.pos.x}%`,
                top: `${n.pos.y}%`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 50}ms`,
                zIndex: 3
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 36, height: 36, borderRadius: 99,
                  background: meta.color,
                  border: isShadow ? '2.5px dashed #fff' : '2.5px solid #fff',
                  opacity: isShadow ? 0.65 : 1,
                  boxShadow: isSel ? `0 2px 12px ${meta.color}66` : '0 2px 8px rgba(0,0,0,0.18)',
                  transition: 'all 0.2s ease',
                  transform: isSel ? 'scale(1.12)' : 'scale(1)',
                  fontSize: 15
                }}
              >
                {n.emoji}
              </div>
              <span
                className="font-ui mt-1 px-1.5"
                style={{
                  background: '#fff', color: 'var(--ink)',
                  border: '1px solid var(--sand3)', borderRadius: 4,
                  fontSize: 8, fontWeight: 600, letterSpacing: 0.02,
                  textTransform: 'uppercase'
                }}
              >
                {isShadow ? '?' : n.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Peek */}
      <div className="bt-sand3" style={{ background: '#fff' }}>
        <div className="px-4 py-3" data-testid="peek">
          {!selected ? (
            <p className="text-center font-ui" style={{ fontSize: 12, color: 'var(--ink3)', padding: '6px 0' }}>
              Tap any node — none of these advertised. AI just kept hearing their names.
            </p>
          ) : selected.kind === 'resource' ? (
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center"
                style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--sand2)', fontSize: 18 }}
              >{selected.emoji}</div>
              <div className="flex-1">
                <div className="font-ui" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{selected.name}</div>
                <div className="font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>{selected.flat} · Tap to request</div>
              </div>
            </div>
          ) : (
            <button
              className="w-full text-left"
              onClick={() => nav(`/map/${selected.node.id}`)}
              data-testid="peek-open"
            >
              {selected.node.status === 'shadow' ? (
                <div>
                  <div className="font-ui" style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>
                    {selected.node.shadowLabel}
                  </div>
                  <div className="font-ui mt-1" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
                    {selected.node.mentions} mentions · Not yet claimed · <span style={{ color: 'var(--rust)' }}>Invite them to join →</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display-i" style={{ fontSize: 17, color: 'var(--ink)' }}>{selected.node.title}</div>
                    <div className="font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
                      {CATEGORY_META[selected.node.category].label} · {selected.node.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="pill" style={{ background: 'var(--sand2)', color: 'var(--ink)', padding: '3px 10px', fontSize: 11 }}>
                      Trust {selected.node.trustScore}
                    </span>
                    <IconChevronRight size={15} color="var(--ink3)" />
                  </div>
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
