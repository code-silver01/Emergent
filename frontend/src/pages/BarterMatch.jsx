import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconArrowUp, IconMicrophone, IconSparkles } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { BARTERS } from '../lib/mockData';
import { MOCK_AI } from '../lib/ai';

export default function BarterMatch() {
  const { matchId } = useParams();
  const nav = useNavigate();
  const b = BARTERS.find(x => x.id === matchId) || BARTERS[0];

  const [messages, setMessages] = useState([{ from: 'ai', text: b.aiContext, source: b.aiSource }]);
  const [input, setInput] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e6, behavior: 'smooth' });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'user', text: input.trim() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: 'ai', text: MOCK_AI.barterFairness }]);
    }, 700);
  };

  const confirm = () => {
    setConfirmed(true);
    setMessages(m => [
      ...m,
      { from: 'user', text: 'Confirmed. Let\'s do it.' },
      { from: 'ai', text: `Locked. I've notified ${b.name} and added it to your ledger. I'll track delivery for both of you.` }
    ]);
  };

  return (
    <div className="bg-cream flex flex-col" style={{ minHeight: '100vh' }} data-testid="barter-match">
      <PageHeader
        variant="ink"
        title={`With ${b.name}`}
        subtitle={`${b.flat} · AI-brokered match`}
        back
      />

      {/* Summary card */}
      <section className="px-5 mt-3">
        <div className="card-white grid grid-cols-2 gap-3" data-testid="match-summary">
          <div>
            <div className="eyebrow">They offer</div>
            <div className="font-display-i mt-1" style={{ fontSize: 13.5, color: 'var(--moss)' }}>{b.offers}</div>
          </div>
          <div>
            <div className="eyebrow">They want</div>
            <div className="font-display-i mt-1" style={{ fontSize: 13.5, color: 'var(--gold)' }}>{b.wants}</div>
          </div>
        </div>
      </section>

      {/* Coin suggestion */}
      <section className="px-5 mt-3">
        <div className="card" style={{ background: 'var(--gold3)', borderColor: 'var(--gold)' }}>
          <div className="eyebrow" style={{ color: 'var(--gold)' }}>Mohalla suggests</div>
          <p className="font-ui mt-1" style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{b.coinSuggestion}</p>
          <p className="font-ui mt-1" style={{ fontSize: 10.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
            Coin values update weekly based on supply and demand in your neighbourhood.
          </p>
        </div>
      </section>

      {/* Chat */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3" data-testid="chat">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'ai' ? '' : 'flex justify-end'}>
            <div className={m.from === 'ai' ? 'bubble-ai' : 'bubble-user'}>
              {m.text}
              {m.source && (
                <div className="mt-1.5" style={{ fontSize: 10, color: 'var(--ink3)', fontStyle: 'italic' }}>
                  (Source: {m.source})
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && <div className="typing-dots"><span /><span /><span /></div>}
      </div>

      <div className="bt-sand3 bg-cream px-3 pt-3" style={{ paddingBottom: 64, position: 'relative', zIndex: 50 }}>
        {!confirmed ? (
          <>
            <button onClick={confirm} data-testid="confirm-barter" className="btn btn-rust w-full mb-2" style={{ height: 48 }}>
              Confirm this barter
            </button>
            <div className="flex items-center gap-2">
              <button
                className="flex items-center justify-center"
                style={{ width: 38, height: 38, borderRadius: 99, border: '1px solid var(--sand3)' }}
              >
                <IconMicrophone size={15} color="var(--ink2)" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask the AI…"
                className="flex-1 font-ui"
                data-testid="chat-input"
                style={{
                  background: 'var(--sand2)', border: '1px solid var(--sand3)',
                  borderRadius: 99, padding: '9px 14px', fontSize: 13.5, color: 'var(--ink)'
                }}
              />
              <button
                onClick={send}
                data-testid="chat-send"
                className="flex items-center justify-center"
                style={{ width: 38, height: 38, borderRadius: 99, background: 'var(--rust)' }}
              >
                <IconArrowUp size={15} color="#fff" />
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => nav('/ledger')} className="btn btn-outline w-full" data-testid="view-ledger">
            View updated ledger →
          </button>
        )}
      </div>
    </div>
  );
}
