import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import { getPendingPhone } from '../lib/storage';

export default function Otp() {
  const nav = useNavigate();
  const phone = getPendingPhone();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);

  if (!phone) {
    nav('/', { replace: true });
    return null;
  }

  const update = (i, v) => {
    const d = v.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = d;
    setDigits(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
    if (next.every(x => x !== '')) {
      setTimeout(() => nav('/role'), 250);
    }
  };

  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--cream)' }} data-testid="otp-screen">
      <div className="px-5 pt-6">
        <button
          onClick={() => nav(-1)}
          className="inline-flex items-center gap-1 font-ui"
          style={{ fontSize: 13, color: 'var(--ink3)' }}
          data-testid="otp-back"
        >
          <IconArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="px-7 pt-10 fade-up">
        <h1 className="font-display-i" style={{ fontSize: 28, color: 'var(--ink)', lineHeight: 1.2 }}>
          Verify your number
        </h1>
        <p className="mt-2 font-ui" style={{ fontSize: 13, color: 'var(--ink3)', fontWeight: 300 }}>
          Sent to +91 {phone.slice(0, 5)} {phone.slice(5)}
        </p>

        <div className="mt-8 flex gap-2 justify-between" data-testid="otp-boxes">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              inputMode="numeric"
              className="otp-box"
              data-testid={`otp-box-${i}`}
            />
          ))}
        </div>

        <p className="mt-6 font-ui" style={{ fontSize: 12, color: 'var(--ink3)', fontStyle: 'italic' }}>
          Any 6 digits for demo — wink. 😉
        </p>
        <button
          className="mt-4 font-ui"
          style={{ fontSize: 12.5, color: 'var(--rust)' }}
          data-testid="resend"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}
