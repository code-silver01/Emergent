import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  IconArrowLeft, IconSparkles, IconCircleFilled, IconShieldCheckFilled,
  IconBrandWhatsapp, IconX, IconCheck
} from '@tabler/icons-react';
import { NODES, CATEGORY_META, USERS } from '../lib/mockData';
import { loadDemo, patchDemo } from '../lib/storage';

export default function NodeProfile() {
  const { nodeId } = useParams();
  const nav = useNavigate();
  const demo = loadDemo();
  const baseNode = NODES.find(n => n.id === nodeId);
  if (!baseNode) {
    return (
      <div className="p-8 text-center">
        <p>Node not found.</p>
        <button className="btn btn-outline mt-4" onClick={() => nav('/map')}>Back to map</button>
      </div>
    );
  }

  // Sunita's node becomes claimed after demo flag is on
  const node = (baseNode.id === 'sunita' && demo.sunitaClaimed)
    ? { ...baseNode, status: 'claimed' }
    : baseNode;

  const isShadow = node.status === 'shadow';
  const meta = CATEGORY_META[node.category];
  const [inviteOpen, setInviteOpen] = useState(false);
  const [sentToast, setSentToast] = useState(false);

  const sendInvite = () => {
    patchDemo({ inviteSent: true });
    setInviteOpen(false);
    setSentToast(true);
    setTimeout(() => setSentToast(false), 2500);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }} data-testid="node-profile">
      {/* Back */}
      <div className="px-5 pt-5">
        <button
          onClick={() => nav(-1)}
          className="inline-flex items-center gap-1 font-ui"
          style={{ fontSize: 13, color: 'var(--ink3)' }}
          data-testid="back-btn"
        >
          <IconArrowLeft size={15} /> Back to map
        </button>
      </div>

      {/* Top header */}
      <section className="px-5 pt-4">
        <div className="card flex items-center gap-4" style={{ background: 'var(--sand2)' }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 56, height: 56, borderRadius: 99,
              background: meta.color, color: '#fff',
              fontFamily: 'Fraunces', fontSize: 26, fontWeight: 500,
              filter: isShadow ? 'blur(0.5px)' : 'none',
              opacity: isShadow ? 0.7 : 1
            }}
          >
            {isShadow ? '?' : node.name[0]}
          </div>
          <div className="flex-1">
            <div className="font-ui" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>
              {isShadow ? 'Unclaimed profile' : node.title}
            </div>
            <div className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink3)', fontWeight: 300 }}>
              {isShadow ? `Block B · ${node.mentions} mentions` : `${node.flat || ''} · ${node.location}`}
            </div>
            <span
              className="pill mt-1"
              style={{ background: meta.color, color: '#fff', padding: '2px 9px', fontSize: 10 }}
            >
              {meta.label}
            </span>
          </div>
        </div>
      </section>

      {/* Shadow banner */}
      {isShadow && (
        <section className="px-5 mt-4 fade-up">
          <div className="card bl-sky" style={{ background: 'var(--sky2)', borderColor: 'var(--sky)' }} data-testid="shadow-banner">
            <div className="flex items-center gap-1.5">
              <IconShieldCheckFilled size={14} color="var(--sky)" />
              <span className="font-ui" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)' }}>
                {node.name} hasn't claimed this profile yet
              </span>
            </div>
            <p className="font-ui mt-1.5" style={{ fontSize: 12, color: 'var(--ink3)', lineHeight: 1.5 }}>
              It was built from {node.mentions} community mentions. We protect identity until consent.
            </p>
            <button
              onClick={() => setInviteOpen(true)}
              data-testid="invite-btn"
              className="btn btn-rust mt-3"
              style={{ height: 40, padding: '0 18px', fontSize: 13.5 }}
            >
              Invite her →
            </button>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="px-5 mt-4 grid grid-cols-3 gap-2">
        <Stat label="Trust" value={node.trustScore} />
        <Stat label="Mentions" value={node.mentions} />
        <StatStatus available={node.available} />
      </section>

      {/* AI inferred */}
      <section className="px-5 mt-4">
        <div className="card bl-moss">
          <div className="flex items-center gap-1.5 mb-1">
            <IconSparkles size={12} color="var(--moss)" />
            <span className="eyebrow" style={{ color: 'var(--moss)' }}>AI inferred availability</span>
          </div>
          <p className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>{node.aiInferredNote}</p>
          <p className="font-ui" style={{ fontSize: 10, color: 'var(--ink3)', fontStyle: 'italic', marginTop: 4 }}>
            Source: inferred from 2 conversations
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="px-5 mt-5">
        <div className="eyebrow">What they're known for</div>
        <div className="flex flex-wrap gap-2 mt-3">
          {node.skills.map(s => (
            <span
              key={s}
              className="pill"
              style={{ background: meta.color + '22', color: meta.color, fontWeight: 500 }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Community evidence */}
      <section className="px-5 mt-5">
        <div className="eyebrow">Community evidence</div>
        <div className="mt-3 space-y-2">
          {node.quotes.map((q, i) => (
            <blockquote
              key={i}
              className="font-display-i"
              style={{
                background: '#fff', border: '1px solid var(--sand3)',
                borderRadius: 'var(--radius)', padding: '10px 14px',
                fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5
              }}
            >
              {q}
            </blockquote>
          ))}
        </div>
      </section>

      {/* Evidence score */}
      <section className="px-5 mt-5">
        <div className="card">
          <div className="eyebrow">Evidence score breakdown</div>
          <ul className="mt-2 space-y-1">
            <EvLine label={`${node.evidence?.households || node.mentions} unique households`} />
            <EvLine label={`${node.evidence?.months || 3}+ months consistent`} />
            <EvLine label={`${node.evidence?.disputes ?? 0} disputes or negative signals`} />
            {node.evidence?.verifiedBy && <EvLine label={`Verified by ${node.evidence.verifiedBy}`} />}
          </ul>
          <div
            className="font-display mt-2"
            style={{ fontSize: 16, color: 'var(--gold)', borderTop: '1px solid var(--sand3)', paddingTop: 6 }}
          >
            Score: {node.trustScore}/100
          </div>
          <p className="font-ui" style={{ fontSize: 10.5, color: 'var(--ink3)', fontStyle: 'italic', marginTop: 4 }}>
            This is harder to manipulate than star ratings.
          </p>
        </div>
      </section>

      {/* Coin value */}
      <section className="px-5 mt-4">
        <div className="card text-center" style={{ background: 'var(--gold3)', borderColor: 'var(--gold)' }}>
          <p className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink2)' }}>
            Mohalla values <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{meta.label.toLowerCase()}</span> at{' '}
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>~{node.coinValuePerHr} coins/{node.category === 'food' ? 'week' : 'hr'}</span> locally.
          </p>
        </div>
      </section>

      {/* CTAs */}
      <section className="px-5 mt-6" style={{ paddingBottom: 120 }} />
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-5 py-4 bt-sand3"
        style={{ background: 'var(--cream)', zIndex: 9999 }}
      >
        {!isShadow ? (
          <div className="grid grid-cols-2 gap-2">
            <button data-testid="connect-btn" className="btn btn-rust" style={{ height: 46 }}>Connect</button>
            <button data-testid="propose-barter" className="btn btn-outline" style={{ height: 46 }} onClick={() => nav('/barter')}>Propose barter</button>
          </div>
        ) : (
          <button
            onClick={() => setInviteOpen(true)}
            data-testid="invite-btn-fixed"
            className="btn btn-rust w-full"
            style={{ height: 46 }}
          >
            Invite her to claim →
          </button>
        )}
      </div>

      {/* Invite modal */}
      {inviteOpen && (
        <InviteModal node={node} onClose={() => setInviteOpen(false)} onSend={sendInvite} />
      )}

      {/* Toast */}
      {sentToast && (
        <div
          className="fixed left-1/2 -translate-x-1/2 fade-up"
          style={{
            bottom: 120, zIndex: 10001,
            background: 'var(--moss)', color: '#fff',
            padding: '10px 18px', borderRadius: 99, fontSize: 13, fontWeight: 500,
            boxShadow: '0 6px 24px rgba(0,0,0,0.3)'
          }}
          data-testid="invite-toast"
        >
          ✓ Invite sent to +91 98455 01234 via WhatsApp
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card-white text-center" style={{ padding: '10px 6px' }}>
      <div className="font-display" style={{ fontSize: 22, color: 'var(--ink)' }}>{value}</div>
      <div className="eyebrow mt-1">{label}</div>
    </div>
  );
}

function StatStatus({ available }) {
  return (
    <div className="card-white text-center flex flex-col items-center justify-center" style={{ padding: '10px 6px' }}>
      <div className="flex items-center gap-1">
        <IconCircleFilled size={9} color={available ? 'var(--moss2)' : 'var(--alert)'} />
        <span className="font-ui" style={{ fontSize: 13, fontWeight: 600, color: available ? 'var(--moss)' : 'var(--alert)' }}>
          {available ? 'Active' : 'Away'}
        </span>
      </div>
      <div className="eyebrow mt-1">Status</div>
    </div>
  );
}

function EvLine({ label }) {
  return (
    <li className="font-ui flex items-start gap-1.5" style={{ fontSize: 12.5, color: 'var(--ink2)' }}>
      <IconCheck size={12} color="var(--moss)" stroke={2.4} style={{ marginTop: 2 }} /> {label}
    </li>
  );
}

function InviteModal({ node, onClose, onSend }) {
  const sunita = USERS.sunita;
  return (
    <div
      className="fixed inset-0 flex items-end justify-center"
      style={{ background: 'rgba(19,16,10,0.55)', zIndex: 10010 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] fade-up"
        style={{
          background: 'var(--cream)',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: '20px 20px 28px',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
        data-testid="invite-modal"
      >
        <div className="flex items-start justify-between mb-3">
          <h2 className="font-display-i" style={{ fontSize: 22, color: 'var(--ink)' }}>
            Invite Sunita to claim her profile
          </h2>
          <button onClick={onClose} aria-label="close"><IconX size={20} color="var(--ink3)" /></button>
        </div>
        <p className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink3)', lineHeight: 1.5 }}>
          I'll send a WhatsApp message to her number. She'll see what neighbours have said and can choose to join.
        </p>

        {/* WhatsApp preview */}
        <div
          className="mt-4"
          style={{
            background: '#dcf8c6',
            border: '1px solid #b9e0a8',
            borderRadius: 14,
            padding: '12px 14px',
            position: 'relative'
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <IconBrandWhatsapp size={14} color="#25d366" />
            <span className="font-ui" style={{ fontSize: 11, fontWeight: 600, color: '#2a4a1a' }}>
              From: Mohalla
            </span>
          </div>
          <p className="font-ui" style={{ fontSize: 12.5, color: '#1a2a10', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
{`Hi Sunita 👋 5 neighbours at Srinivasa Apartments have been recommending your tiffin!

One of them — Aditya from Flat 504 — invited you to see what they're saying and optionally join Mohalla.

Your invite code: ${sunita.inviteCode}
mohalla.in/invite/${sunita.inviteCode}

You stay in control — see it first, then decide.`}
          </p>
        </div>

        <button
          onClick={onSend}
          data-testid="send-invite"
          className="btn btn-moss w-full mt-5"
          style={{ height: 52 }}
        >
          <IconBrandWhatsapp size={17} /> Send invite via WhatsApp
        </button>
        <p className="font-ui text-center mt-3" style={{ fontSize: 10.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
          Source: 5 community mentions + this app's discovery layer
        </p>
      </div>
    </div>
  );
}
