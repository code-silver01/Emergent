import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMicrophone, IconArrowUp, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { MOCK_AI } from '../lib/ai';
import { loadUser, saveUser, patchDemo } from '../lib/storage';

const STEPS = [
  { ai: MOCK_AI.sunitaWelcome, follow: MOCK_AI.sunitaAskOffer, suggest: 'I make South Indian tiffin for working people in the building' },
  { ai: MOCK_AI.sunitaAskCapacity, suggest: 'Max 6-8 people, ₹80 per meal' },
  { ai: MOCK_AI.sunitaAskAvail, suggest: 'Mornings before 9 and evenings after 6' }
];

export default function OnboardGig() {
  const nav = useNavigate();
  const user = loadUser();
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [askConnect, setAskConnect] = useState(false);
  const [answers, setAnswers] = useState({ offer: '', capacity: '', avail: '' });
  const scrollRef = useRef(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (!user) { nav('/'); return; }
    if (initRef.current) return;
    initRef.current = true;
    pushAI(MOCK_AI.sunitaWelcome, 500);
    setTimeout(() => pushAI(MOCK_AI.sunitaAskOffer, 1500), 1500);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e6, behavior: 'smooth' });
  }, [messages, typing, showCard]);

  const pushAI = (text, delay = 600) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: 'ai', text }]);
    }, delay);
  };
  const pushUser = (text) => setMessages(m => [...m, { from: 'user', text }]);

  const submitInput = () => {
    if (!input.trim()) return;
    const text = input.trim();
    pushUser(text);
    setInput('');
    if (step === 0) {
      setAnswers(a => ({ ...a, offer: text }));
      pushAI(MOCK_AI.sunitaAskCapacity, 700);
      setStep(1);
    } else if (step === 1) {
      setAnswers(a => ({ ...a, capacity: text }));
      pushAI(MOCK_AI.sunitaAskAvail, 700);
      setStep(2);
    } else if (step === 2) {
      setAnswers(a => ({ ...a, avail: text }));
      setTimeout(() => setShowCard(true), 600);
      setTimeout(() => {
        pushAI(MOCK_AI.sunitaProfileDone, 800);
        setAskConnect(true);
        setStep(3);
      }, 1800);
    }
  };

  const connect = () => {
    pushUser('Yes, connect us');
    setAskConnect(false);
    patchDemo({ connectionMade: true, sunitaOnboarded: true });
    pushAI(MOCK_AI.sunitaConnectionMade, 800);
    setTimeout(() => setStep(4), 1800);
  };

  const skip = () => {
    pushUser('Not yet');
    setAskConnect(false);
    patchDemo({ sunitaOnboarded: true });
    setStep(4);
  };

  const finish = () => {
    saveUser({ ...user, onboarded: true });
    nav('/home');
  };

  const suggest = STEPS[step]?.suggest;

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--cream)', minHeight: '100vh' }} data-testid="onboard-gig">
      <header className="moss-header px-5 pt-6 pb-5">
        <h1 className="font-display-i" style={{ fontSize: 22, color: '#fff' }}>Welcome, {user?.name || 'Sunita'}.</h1>
        <p className="font-ui mt-1" style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>
          Gig mode · trust score carries over
        </p>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3" data-testid="chat">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'ai' ? '' : 'flex justify-end'}>
            <div className={m.from === 'ai' ? 'bubble-ai' : 'bubble-user'}>{m.text}</div>
          </div>
        ))}
        {typing && <div className="typing-dots"><span /><span /><span /></div>}

        {showCard && (
          <div className="fade-up" style={{ marginTop: 8 }}>
            <div
              className="card-white"
              style={{ border: '1.5px solid var(--moss)', background: '#fff', padding: 16 }}
              data-testid="profile-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 44, height: 44, borderRadius: 99, background: 'var(--moss)', color: '#fff', fontFamily: 'Fraunces', fontSize: 22 }}
                >
                  S
                </div>
                <div>
                  <div className="font-ui" style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Sunita · Flat 403</div>
                  <div className="pill mt-0.5" style={{ background: 'var(--moss3)', color: 'var(--moss)', padding: '2px 8px', fontSize: 10 }}>Home tiffin</div>
                </div>
              </div>
              <Row label="Capacity" value={answers.capacity || '6-8 people, ₹80/meal'} />
              <Row label="Available" value={answers.avail || '7-9am, 6-8pm'} />
              <Row label="Trust score" value="61 · 5 community mentions" check />
            </div>
          </div>
        )}

        {askConnect && !typing && (
          <div className="flex gap-2 mt-3" data-testid="connect-pills">
            <button
              onClick={connect}
              data-testid="connect-yes"
              className="pill"
              style={{ background: 'var(--moss)', color: '#fff', padding: '8px 14px', fontSize: 13 }}
            >
              Yes, connect us
            </button>
            <button
              onClick={skip}
              data-testid="connect-no"
              className="pill"
              style={{ background: 'transparent', color: 'var(--ink2)', border: '1px solid var(--sand4)', padding: '8px 14px', fontSize: 13 }}
            >
              Not yet
            </button>
          </div>
        )}
      </div>

      <div className="bt-sand3 px-3 pt-3 bg-cream" style={{ paddingBottom: 64, position: 'relative', zIndex: 50 }}>
        {step === 4 ? (
          <button
            onClick={finish}
            data-testid="finish-gig"
            className="btn btn-moss w-full"
            style={{ height: 52 }}
          >
            Go to my dashboard <IconArrowRight size={17} />
          </button>
        ) : step === 3 ? (
          <p className="text-center font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)' }}>
            Tap a choice to continue
          </p>
        ) : (
          <>
            {suggest && !input && (
              <button
                onClick={() => setInput(suggest)}
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
                💡 Tap to fill: "{suggest}"
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
                placeholder="Type your reply…"
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
                style={{ width: 40, height: 40, borderRadius: 99, background: 'var(--moss)' }}
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

function Row({ label, value, check }) {
  return (
    <div className="flex items-center justify-between py-1.5" style={{ borderTop: '1px solid var(--sand3)' }}>
      <span className="eyebrow">{label}</span>
      <span className="font-ui inline-flex items-center gap-1" style={{ fontSize: 12.5, color: 'var(--ink)' }}>
        {value}
        {check && <IconCheck size={12} color="var(--moss)" />}
      </span>
    </div>
  );
}
