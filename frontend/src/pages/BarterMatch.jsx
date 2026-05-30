import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconMicrophone, IconArrowUp, IconSparkles } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_BARTERS } from '../lib/mockData';
import { getMockAIResponse } from '../lib/ai';

export default function BarterMatch() {
  const { id } = useParams();
  const nav = useNavigate();
  const barter = SEED_BARTERS.find(b => b.id === id) || SEED_BARTERS[0];

  const [messages, setMessages] = useState([
    { from: 'ai', text: getMockAIResponse('match_explain') }
  ]);
  const [input, setInput] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'user', text: input.trim() }]);
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { from: 'ai', text: getMockAIResponse('match_fairness') }]);
    }, 600);
  };

  const confirm = () => {
    setConfirmed(true);
    setMessages(m => [
      ...m,
      { from: 'user', text: 'Confirmed. Let\'s do it.' },
      { from: 'ai', text: 'Locked. I\'ve added 180 coins on your side and notified ' + barter.name + '. I\'ll track delivery for both of you.' }
    ]);
  };

  return (
    <div className="bg-cream min-h-screen flex flex-col" data-testid="barter-match">
      <PageHeader
        variant="ink"
        title={`With ${barter.name}`}
        subtitle={`Flat ${barter.flat} · AI-brokered match`}
        back
      />

      {/* Match summary card */}
      <section className="px-5 mt-4">
        <div className="card-cream p-4" data-testid="match-summary">
          <div className="grid grid-cols-2 gap-3">
            <Bit label="They offer" value={barter.offers} color="var(--moss)" />
            <Bit label="They want" value={barter.wants} color="var(--gold)" />
          </div>
        </div>
      </section>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3" data-testid="match-chat">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'ai' ? '' : 'flex justify-end'}>
            <div className={m.from === 'ai' ? 'bubble-ai fade-up' : 'bubble-user fade-up'}>{m.text}</div>
          </div>
        ))}

        {/* Fairness card after AI mentions it */}
        {messages.length >= 3 && (
          <div className="card-soft p-4 fade-up" style={{ borderLeft: '2px solid var(--gold)' }} data-testid="fairness-card">
            <div className="flex items-center gap-1.5 mb-2">
              <IconSparkles size={12} color="var(--gold)" />
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>Coin fairness</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Bit label="Your coins owed" value="5" small />
              <Bit label="AI balance" value="Fair ±5%" small />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="hairline-t bg-cream px-3 pt-3 relative z-50" style={{ paddingBottom: 64 }}>
        {!confirmed ? (
          <>
            <button className="btn-rust w-full mb-2" onClick={confirm} data-testid="confirm-barter">
              Confirm this barter
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-full hairline" aria-label="voice">
                <IconMicrophone size={16} stroke={1.7} color="var(--ink2)" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask the AI anything…"
                className="flex-1 hairline rounded-[99px] px-4 py-2 font-ui text-[14px] outline-none"
              />
              <button onClick={send} className="p-2.5 rounded-full" style={{ background: 'var(--rust)' }}>
                <IconArrowUp size={16} color="var(--cream)" />
              </button>
            </div>
            <p className="text-[10.5px] text-center mt-2" style={{ color: 'var(--ink2)' }}>
              I'll track the ledger for both of you.
            </p>
          </>
        ) : (
          <button className="btn-outline w-full" onClick={() => nav('/barter/ledger')} data-testid="view-ledger-after">
            View updated ledger →
          </button>
        )}
      </div>
    </div>
  );
}

const Bit = ({ label, value, color, small }) => (
  <div>
    <div className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--ink2)' }}>{label}</div>
    <div className={small ? 'font-display text-[18px]' : 'font-display-i text-[14.5px] mt-0.5 leading-snug'} style={{ color: color || 'var(--ink)' }}>
      {value}
    </div>
  </div>
);
