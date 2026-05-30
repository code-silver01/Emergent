import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMicrophone, IconArrowUp, IconArrowRight } from '@tabler/icons-react';
import { MOCK_AI } from '../lib/ai';
import { DAY1_BRIEF } from '../lib/mockData';
import { loadUser, saveUser, patchDemo, loadDemo } from '../lib/storage';

export default function OnboardResident() {
  const nav = useNavigate();
  const user = loadUser();
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(0); // 0 welcome, 1 brief done, 2 contribution, 3 gig setup, 4 done
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showPills, setShowPills] = useState(true);
  const scrollRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (!user) { nav('/'); return; }
    if (initRef.current) return;
    initRef.current = true;
    // Initial AI welcome
    pushAI(MOCK_AI.residentWelcome(user.name), 400);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e6, behavior: 'smooth' });
  }, [messages, typing]);

  const pushAI = (text, delay = 600, special = null) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'ai', text, special }]);
    }, delay);
  };

  const pushUser = (text) => setMessages(m => [...m, { from: 'user', text }]);

  const handleYesBrief = () => {
    setShowPills(false);
    pushUser('Yes please');
    pushAI(MOCK_AI.day1BriefIntro, 700, { type: 'day1' });
    setTimeout(() => {
      pushAI(MOCK_AI.contributionAsk, 800);
      setStep(1);
    }, 1700);
  };

  const handleMaybe = () => {
    setShowPills(false);
    pushUser('Maybe later');
    pushAI(MOCK_AI.contributionAsk, 700);
    setStep(1);
  };

  const submitInput = () => {
    if (!input.trim()) return;
    const text = input.trim();
    pushUser(text);
    setInput('');
    if (step === 1) {
      // contribution
      const coins = 8;
      const demo = loadDemo();
      patchDemo({
        adityaCoins: demo.adityaCoins + coins,
        adityaContributions: [
          ...demo.adityaContributions,
          { description: `Recommended: ${text}`, coins, timestamp: 'just now' }
        ]
      });
      pushAI(MOCK_AI.contributionAck(text, coins), 800);
      setTimeout(() => {
        pushAI(MOCK_AI.gigSetupAsk, 700);
        setStep(2);
      }, 1700);
    } else if (step === 2) {
      pushAI(MOCK_AI.gigProfileAck(text), 700);
      setTimeout(() => setStep(3), 1000);
    }
  };

  const finish = () => {
    patchDemo({ adityaOnboarded: true });
    saveUser({ ...user, onboarded: true });
    nav('/home');
  };

  const placeholder = step === 1
    ? 'Share something about your neighbourhood…'
    : step === 2
      ? 'I\'m a product designer, freelance'
      : 'Type your reply…';

  // Suggestion auto-fill for demo speed
  const suggestion = step === 1
    ? "There's a new idli stall near the main gate, run by Murugan"
    : step === 2
      ? "I'm a product designer, work freelance"
      : '';

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--cream)', minHeight: '100vh' }} data-testid="onboard-resident">
      {/* Header */}
      <header className="dark-header px-5 pt-5 pb-4 flex items-center justify-between">
        <span className="font-display-i" style={{ fontSize: 20, color: '#fff', position: 'relative', zIndex: 2 }}>Mohalla</span>
        <div className="flex gap-1.5" style={{ position: 'relative', zIndex: 2 }} data-testid="progress-dots">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 6, height: 6, borderRadius: 99,
                background: step >= i ? 'var(--rust)' : 'rgba(244,237,224,0.25)',
                transition: 'all 220ms ease'
              }}
            />
          ))}
        </div>
      </header>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3" data-testid="chat">
        {messages.map((m, i) => {
          if (m.special?.type === 'day1') {
            return (
              <div key={i} className="bubble-ai" style={{ maxWidth: '92%' }}>
                <p style={{ marginBottom: 10 }}>{m.text}</p>
                <div className="space-y-2 mt-2">
                  {DAY1_BRIEF.map((b, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2"
                      style={{
                        background: '#fff',
                        border: '1px solid var(--sand3)',
                        borderLeft: '3px solid var(--rust)',
                        borderRadius: 10,
                        padding: '8px 10px',
                        fontSize: 12.5
                      }}
                    >
                      <span style={{ fontSize: 13 }}>{b.emoji}</span>
                      <span style={{ color: 'var(--ink2)' }}>{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <div key={i} className={m.from === 'ai' ? '' : 'flex justify-end'}>
              <div className={m.from === 'ai' ? 'bubble-ai' : 'bubble-user'}>{m.text}</div>
            </div>
          );
        })}
        {typing && <div className="typing-dots"><span /><span /><span /></div>}

        {step === 0 && showPills && !typing && messages.length === 1 && (
          <div className="flex gap-2 mt-3" data-testid="welcome-pills">
            <button
              onClick={handleYesBrief}
              data-testid="pill-yes"
              className="pill"
              style={{ background: 'var(--rust)', color: '#fff', padding: '8px 16px', fontSize: 13 }}
            >
              Yes please
            </button>
            <button
              onClick={handleMaybe}
              data-testid="pill-maybe"
              className="pill"
              style={{ background: 'transparent', color: 'var(--ink2)', border: '1px solid var(--sand4)', padding: '8px 16px', fontSize: 13 }}
            >
              Maybe later
            </button>
          </div>
        )}
      </div>

      {/* Input or finish */}
      <div className="bt-sand3 px-3 pt-3 bg-cream" style={{ paddingBottom: 64, position: 'relative', zIndex: 50 }}>
        {step === 3 ? (
          <button
            onClick={finish}
            data-testid="finish-onboard"
            className="btn btn-rust w-full"
            style={{ height: 52 }}
          >
            Take me to my neighbourhood <IconArrowRight size={17} />
          </button>
        ) : step === 0 ? (
          <p className="text-center font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
            Tap a choice above to continue
          </p>
        ) : (
          <>
            {suggestion && !input && (
              <button
                onClick={() => setInput(suggestion)}
                data-testid="suggest-fill"
                className="font-ui mb-2 px-3 py-1.5"
                style={{
                  fontSize: 11.5,
                  color: 'var(--ink3)',
                  background: 'var(--sand2)',
                  border: '1px dashed var(--sand4)',
                  borderRadius: 8
                }}
              >
                💡 Tap to fill: "{suggestion}"
              </button>
            )}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center"
                style={{ width: 40, height: 40, borderRadius: 99, border: '1px solid var(--sand3)' }}
                aria-label="voice"
              >
                <IconMicrophone size={17} stroke={1.7} color="var(--ink2)" />
              </button>
              <input
                data-testid="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitInput()}
                placeholder={placeholder}
                className="flex-1 font-ui"
                style={{
                  background: 'var(--sand2)',
                  border: '1px solid var(--sand3)',
                  borderRadius: 99,
                  padding: '10px 16px',
                  fontSize: 14,
                  color: 'var(--ink)'
                }}
              />
              <button
                data-testid="chat-send"
                onClick={submitInput}
                className="flex items-center justify-center"
                style={{ width: 40, height: 40, borderRadius: 99, background: 'var(--rust)' }}
                aria-label="send"
              >
                <IconArrowUp size={17} stroke={2} color="#fff" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
