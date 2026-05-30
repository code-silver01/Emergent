import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowRight, IconShieldCheckFilled } from '@tabler/icons-react';
import { USERS, NODES } from '../lib/mockData';
import { MOCK_AI } from '../lib/ai';
import { saveUser, patchDemo, loadDemo } from '../lib/storage';

export default function InviteClaim() {
  const { code } = useParams();
  const nav = useNavigate();
  const demo = loadDemo();
  const sunita = USERS.sunita;
  const node = NODES.find(n => n.id === 'sunita');

  const [consent, setConsent] = useState({
    name: false,
    contact: false,
    score: false
  });

  if (!code || code.toUpperCase() !== demo.inviteCode) {
    return (
      <div className="phone-shell flex flex-col items-center justify-center px-7 text-center" style={{ background: 'var(--cream)' }}>
        <h1 className="font-display-i" style={{ fontSize: 26 }}>Invite not found</h1>
        <p className="mt-2 font-ui" style={{ fontSize: 13, color: 'var(--ink3)' }}>
          Code <code style={{ background: 'var(--sand2)', padding: '1px 6px', borderRadius: 4 }}>{code}</code> doesn't match any active invite.
        </p>
        <button className="btn btn-outline mt-6" onClick={() => nav('/')}>Back to start</button>
      </div>
    );
  }

  const canClaim = consent.name;

  const claim = () => {
    const u = {
      ...sunita,
      claimedProfile: true,
      consent
    };
    saveUser(u);
    patchDemo({ sunitaClaimed: true });
    nav('/onboard/gig');
  };

  const shadow = () => {
    // Stays in shadow — back to splash for the demo
    nav('/');
  };

  return (
    <div className="phone-shell" style={{ background: 'var(--cream)', minHeight: '100vh' }} data-testid="invite-claim">
      {/* Wordmark */}
      <div className="px-7 pt-8">
        <h2 className="font-display-i" style={{ fontSize: 22, color: 'var(--ink)' }}>Mohalla</h2>
      </div>

      {/* Main card */}
      <section className="px-5 mt-6 fade-up">
        <div className="card-white p-5">
          <div
            className="flex items-center justify-center mx-auto"
            style={{
              width: 64, height: 64, borderRadius: 99,
              background: 'var(--moss)', color: '#fff',
              fontFamily: 'Fraunces', fontSize: 30, fontWeight: 500,
              filter: 'blur(0.5px)'
            }}
          >
            S
          </div>
          <h1 className="font-display-i mt-4 text-center" style={{ fontSize: 24, color: 'var(--ink)', lineHeight: 1.2 }}>
            {MOCK_AI.sunitaInviteHeadline}
          </h1>
          <p className="mt-3 text-center font-ui" style={{ fontSize: 13, color: 'var(--ink3)', fontWeight: 300, lineHeight: 1.5 }}>
            5 residents at Srinivasa Apartments have been recommending your home tiffin. Here's what they said.
          </p>
        </div>
      </section>

      {/* Quotes */}
      <section className="px-5 mt-4 space-y-2 stagger">
        {node.quotes.map((q, i) => (
          <div
            key={i}
            className="font-display-i"
            style={{
              background: 'var(--sand2)',
              border: '1px solid var(--sand3)',
              borderRadius: 'var(--radius)',
              padding: '12px 14px',
              fontSize: 13.5,
              color: 'var(--ink)',
              lineHeight: 1.5
            }}
            data-testid={`mention-${i}`}
          >
            {q.replace(/^Resident in /, '').replace(/^Watchman /, '')}
          </div>
        ))}
      </section>

      {/* Trust preview */}
      <section className="px-5 mt-5">
        <div className="card p-4 text-center" style={{ background: 'var(--gold3)', borderColor: 'var(--gold)' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)' }}>Mohalla trust score</div>
          <div className="font-display mt-2" style={{ fontSize: 44, color: 'var(--gold)', lineHeight: 1 }}>
            {sunita.trustScore}<span style={{ fontSize: 18, color: 'var(--ink3)' }}>/100</span>
          </div>
          <p className="mt-2 font-ui" style={{ fontSize: 11, color: 'var(--ink3)', fontStyle: 'italic' }}>
            Built from community observations only. You haven't shared anything yet.
          </p>
        </div>
      </section>

      {/* Consent */}
      <section className="px-5 mt-6">
        <div className="card p-4 bl-sky" style={{ background: 'var(--sky2)', borderColor: 'var(--sky)' }} data-testid="consent-block">
          <div className="flex items-center gap-1.5">
            <IconShieldCheckFilled size={14} color="var(--sky)" />
            <span className="font-ui" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Before you continue</span>
          </div>
          <p className="mt-1.5 font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)', fontWeight: 300 }}>
            Turning these off keeps you in shadow mode — you exist in our data but are invisible to others. Change anytime.
          </p>

          <div className="mt-4 space-y-3">
            <Toggle
              label="Show my name and flat on Mohalla"
              required
              value={consent.name}
              onChange={(v) => setConsent(s => ({ ...s, name: v }))}
              testId="toggle-name"
            />
            <Toggle
              label="Let neighbours contact me for tiffin orders"
              value={consent.contact}
              onChange={(v) => setConsent(s => ({ ...s, contact: v }))}
              testId="toggle-contact"
            />
            <Toggle
              label="Show my trust score publicly"
              value={consent.score}
              onChange={(v) => setConsent(s => ({ ...s, score: v }))}
              testId="toggle-score"
            />
          </div>
        </div>
      </section>

      <section className="px-5 mt-5 pb-12">
        <button
          onClick={claim}
          disabled={!canClaim}
          data-testid="claim-btn"
          className="btn btn-moss w-full"
          style={{ height: 54 }}
        >
          Claim my profile <IconArrowRight size={17} />
        </button>
        <button
          onClick={shadow}
          data-testid="shadow-btn"
          className="w-full mt-3 font-ui"
          style={{ fontSize: 12.5, color: 'var(--ink3)' }}
        >
          Or <span style={{ color: 'var(--rust)' }}>stay in shadow mode →</span> — your profile stays private
        </button>
      </section>
    </div>
  );
}

function Toggle({ label, required, value, onChange, testId }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1">
        <p className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>
          {label}
          {required && <span style={{ color: 'var(--alert)', marginLeft: 4 }}>*</span>}
        </p>
      </div>
      <div
        className={`toggle ${value ? 'on' : ''}`}
        onClick={() => onChange(!value)}
        data-testid={testId}
        role="switch"
        aria-checked={value}
      />
    </div>
  );
}
