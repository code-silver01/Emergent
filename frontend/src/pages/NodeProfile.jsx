import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconCircleFilled, IconSparkles } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_NODES, CATEGORY_META } from '../lib/mockData';

export default function NodeProfile() {
  const { nodeId } = useParams();
  const nav = useNavigate();
  const node = SEED_NODES.find(n => n.id === nodeId);

  if (!node) {
    return (
      <div className="p-6">
        <p>Node not found.</p>
        <button className="btn-outline mt-3" onClick={() => nav('/map')}>Back to map</button>
      </div>
    );
  }

  const meta = CATEGORY_META[node.category];
  const initials = node.name.slice(0, 1).toUpperCase();

  return (
    <div className="bg-cream min-h-screen" data-testid="node-profile">
      <PageHeader variant="ink" title={node.title} subtitle={`${meta.label} · ${node.location}`} back />

      {/* Avatar + flat */}
      <section className="px-5 pt-6 flex items-center gap-4">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 64, height: 64, background: meta.color,
            color: 'var(--cream)', fontFamily: 'Fraunces', fontSize: 28
          }}
        >
          {initials}
        </div>
        <div>
          <div className="font-display-i text-[20px]" style={{ color: 'var(--ink)' }}>{node.title}</div>
          <div className="text-[12.5px]" style={{ color: 'var(--ink2)' }}>{node.flat}</div>
        </div>
      </section>

      {/* Stats row */}
      <section className="px-5 mt-5 grid grid-cols-3 gap-2" data-testid="node-stats">
        <div className="card-cream p-3 text-center">
          <div className="font-display text-[26px]" style={{ color: 'var(--ink)' }}>{node.trustScore}</div>
          <div className="text-[10px] mt-0.5 uppercase tracking-[0.16em]" style={{ color: 'var(--ink2)' }}>Trust</div>
        </div>
        <div className="card-cream p-3 text-center">
          <div className="font-display text-[26px]" style={{ color: 'var(--ink)' }}>{node.mentions}</div>
          <div className="text-[10px] mt-0.5 uppercase tracking-[0.16em]" style={{ color: 'var(--ink2)' }}>Mentions</div>
        </div>
        <div className="card-cream p-3 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-1">
            <IconCircleFilled size={9} color={node.available ? 'var(--moss2)' : 'var(--alert)'} />
            <span className="text-[13px] font-medium" style={{ color: node.available ? 'var(--moss)' : 'var(--alert)' }}>
              {node.available ? 'Active' : 'Away'}
            </span>
          </div>
          <div className="text-[10px] mt-1 uppercase tracking-[0.16em]" style={{ color: 'var(--ink2)' }}>Status</div>
        </div>
      </section>

      {/* AI inferred note */}
      <section className="px-5 mt-5">
        <div className="card-soft p-4" style={{ borderLeft: '2px solid var(--moss)' }} data-testid="ai-inferred-note">
          <div className="flex items-center gap-1.5 mb-1">
            <IconSparkles size={12} color="var(--moss)" />
            <span className="eyebrow" style={{ color: 'var(--moss)' }}>AI inferred</span>
          </div>
          <p className="text-[13px]" style={{ color: 'var(--ink)' }}>{node.aiInferredNote}</p>
        </div>
      </section>

      {/* Skills */}
      <section className="px-5 mt-6">
        <div className="eyebrow">What they offer</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {node.skills.map((s) => (
            <span key={s} className="pill hairline" style={{ background: 'var(--sand)' }}>{s}</span>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Community mentions</div>
        <div className="mt-3 space-y-3">
          {node.quotes.map((q, i) => (
            <blockquote key={i} className="card-cream p-3 text-[13px] font-display-i" style={{ color: 'var(--ink)' }}>
              "{q}"
            </blockquote>
          ))}
        </div>
      </section>

      {/* Coin value */}
      <section className="px-5 mt-6">
        <div className="card-soft p-3 text-center">
          <p className="text-[12.5px]" style={{ color: 'var(--ink2)' }}>
            Mohalla values this skill at <span style={{ color: 'var(--gold)', fontWeight: 600 }}>~{node.coinValuePerHr} coins/hr</span>
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="px-5 mt-6 mb-10 space-y-2">
        <button data-testid="connect-btn" className="btn-rust w-full">Connect</button>
        <button data-testid="propose-barter-btn" className="btn-outline w-full" onClick={() => nav('/barter')}>Propose barter</button>
      </section>
    </div>
  );
}
