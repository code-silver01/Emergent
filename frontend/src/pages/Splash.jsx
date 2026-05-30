import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowRight, IconTicket } from '@tabler/icons-react';
import { setPendingPhone } from '../lib/storage';

export default function Splash() {
  const nav = useNavigate();
  const [phone, setPhone] = useState('');
  const [showInvite, setShowInvite] = useState(false);
  const [code, setCode] = useState('');

  const submitPhone = () => {
    if (phone.replace(/\D/g, '').length < 10) return;
    setPendingPhone(phone);
    nav('/otp');
  };

  const submitCode = () => {
    const c = code.trim().toUpperCase();
    if (!c) return;
    nav(`/invite/${c}`);
  };

  return (
    <div
      className="phone-shell flex flex-col"
      style={{
        background: 'var(--cream)',
        backgroundImage: 'radial-gradient(circle at 30% 75%, rgba(191,78,30,0.06), transparent 50%)'
      }}
      data-testid="splash"
    >
      {/* Top — wordmark */}
      <div className="pt-20 px-8 text-center fade-up">
        <h1
          className="font-display"
          style={{
            fontSize: 44,
            lineHeight: 1,
            color: 'var(--ink)',
            letterSpacing: '-0.025em',
            fontStyle: 'italic',
            fontWeight: 500
          }}
        >
          Mohalla
        </h1>
        <p
          className="mt-3 mx-auto font-ui"
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: 'var(--ink3)',
            maxWidth: 260,
            lineHeight: 1.5
          }}
        >
          The AI operating system for your neighbourhood.
        </p>
        <div className="mx-auto mt-5" style={{ width: 40, height: 1, background: 'var(--sand3)' }} />
      </div>

      <div className="flex-1" />

      {/* Bottom — phone entry */}
      <div className="px-7 pb-12 fade-up" style={{ animationDelay: '120ms' }}>
        {!showInvite ? (
          <>
            <div className="eyebrow mb-2">Enter your mobile number</div>
            <div
              className="flex items-stretch"
              style={{ height: 52, borderRadius: 'var(--radius)', border: '1px solid var(--sand3)', background: 'var(--sand2)', overflow: 'hidden' }}
            >
              <div
                className="flex items-center px-4 font-ui"
                style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink2)', borderRight: '1px solid var(--sand3)' }}
              >
                +91
              </div>
              <input
                data-testid="phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98xxxxxxxx"
                inputMode="numeric"
                className="flex-1 px-4 font-ui"
                style={{ fontSize: 15, color: 'var(--ink)', background: 'transparent' }}
                onKeyDown={(e) => e.key === 'Enter' && submitPhone()}
              />
            </div>
            <button
              data-testid="continue-btn"
              onClick={submitPhone}
              className="btn btn-rust w-full mt-4"
              style={{ height: 52 }}
            >
              Continue <IconArrowRight size={17} />
            </button>
            <button
              data-testid="show-invite"
              onClick={() => setShowInvite(true)}
              className="w-full mt-4 font-ui inline-flex items-center justify-center gap-1.5"
              style={{ fontSize: 12.5, color: 'var(--ink3)' }}
            >
              <IconTicket size={13} /> Have an invite code? <span style={{ color: 'var(--rust)' }}>Enter here →</span>
            </button>
          </>
        ) : (
          <>
            <div className="eyebrow mb-2">Enter invite code</div>
            <div
              className="flex items-center px-4"
              style={{ height: 52, borderRadius: 'var(--radius)', border: '1px solid var(--sand3)', background: 'var(--sand2)' }}
            >
              <input
                data-testid="invite-code-input"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="MOH-XXXX"
                className="flex-1 font-ui"
                style={{ fontSize: 16, color: 'var(--ink)', background: 'transparent', letterSpacing: '0.08em', fontWeight: 500 }}
                onKeyDown={(e) => e.key === 'Enter' && submitCode()}
              />
            </div>
            <button
              data-testid="invite-go"
              onClick={submitCode}
              className="btn btn-moss w-full mt-4"
              style={{ height: 52 }}
            >
              Continue <IconArrowRight size={17} />
            </button>
            <button
              onClick={() => setShowInvite(false)}
              className="w-full mt-3 font-ui"
              style={{ fontSize: 12.5, color: 'var(--ink3)' }}
            >
              ← Back to phone login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
