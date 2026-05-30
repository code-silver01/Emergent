import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowRight, IconBriefcase2 } from '@tabler/icons-react';
import { setUser, clearAll } from '../lib/storage';

export default function Splash() {
  const nav = useNavigate();
  const [phone, setPhone] = useState('');
  const [otpStage, setOtpStage] = useState(false);
  const [otp, setOtp] = useState('');
  const [asGig, setAsGig] = useState(false);

  const handleEnter = () => {
    if (!otpStage) {
      if (phone.replace(/\D/g, '').length < 10) return;
      setOtpStage(true);
      return;
    }
    // OTP stage — any 6 digits accepted
    if (otp.replace(/\D/g, '').length < 6) return;
    clearAll();
    setUser({
      id: 'me',
      name: asGig ? 'Ramesh' : 'Aanya',
      flat: asGig ? 'D-12' : 'A-302',
      building: 'Sai Heritage',
      phone,
      role: asGig ? 'gig' : 'resident',
      coins: asGig ? 92 : 140,
      trustScore: asGig ? 74 : 34
    });
    nav('/onboard');
  };

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--cream)' }}>
      {/* Top texture / wordmark */}
      <div className="pt-14 px-7">
        <div className="eyebrow" style={{ color: 'var(--rust)' }}>Bengaluru · Koramangala</div>
        <h1 className="font-display mt-3" style={{ fontSize: 34, lineHeight: 1, letterSpacing: '-0.02em' }}>
          Mohalla
        </h1>
        <div className="hairline-b mt-4" />
      </div>

      {/* Main pitch */}
      <div className="px-7 mt-14 fade-up">
        <h2 className="font-display-i" style={{ fontSize: 44, lineHeight: 1.05, color: 'var(--ink)' }}>
          Your neighbourhood,<br />activated.
        </h2>
        <p className="mt-5 text-[14.5px] font-ui" style={{ color: 'var(--ink2)', lineHeight: 1.55, maxWidth: 320 }}>
          The ghost economy of your street, mapped. The aunty who makes the best tiffin. The tutor everyone whispers about. The scams making rounds. All of it — surfaced, not searched.
        </p>
      </div>

      <div className="flex-1" />

      {/* Auth */}
      <div className="px-7 pb-10 fade-up" style={{ animationDelay: '120ms' }}>
        {!otpStage ? (
          <>
            <label className="eyebrow block mb-2">Phone number</label>
            <div className="flex items-center gap-2 hairline rounded-[12px] bg-cream px-4 py-3">
              <span className="font-ui text-[14px]" style={{ color: 'var(--ink2)' }}>+91</span>
              <input
                data-testid="phone-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98xxxxxxxx"
                inputMode="numeric"
                className="flex-1 outline-none bg-transparent font-ui text-[15px]"
                style={{ color: 'var(--ink)' }}
              />
            </div>
          </>
        ) : (
          <>
            <label className="eyebrow block mb-2">Enter 6-digit OTP (any digits work)</label>
            <input
              data-testid="otp-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="••••••"
              inputMode="numeric"
              className="w-full outline-none hairline rounded-[12px] bg-cream px-4 py-3 font-ui text-[18px] tracking-[0.6em] text-center"
              style={{ color: 'var(--ink)' }}
            />
            <p className="text-[11.5px] mt-2 font-ui" style={{ color: 'var(--ink2)' }}>
              Demo mode — any 6 digits will let you in.
            </p>
          </>
        )}

        <button
          data-testid="enter-btn"
          onClick={handleEnter}
          className="btn-rust w-full mt-5 flex items-center justify-center gap-2"
        >
          Enter Mohalla <IconArrowRight size={18} stroke={1.8} />
        </button>

        <button
          data-testid="gig-toggle"
          onClick={() => setAsGig(!asGig)}
          className="mt-4 w-full text-[13px] font-ui flex items-center justify-center gap-1.5"
          style={{ color: asGig ? 'var(--moss)' : 'var(--ink2)' }}
        >
          <IconBriefcase2 size={14} stroke={1.7} />
          {asGig ? 'Continuing as service provider →' : "I'm a service provider"}
        </button>
      </div>
    </div>
  );
}
