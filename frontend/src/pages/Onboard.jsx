import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMicrophone, IconArrowUp } from '@tabler/icons-react';
import { getUser } from '../lib/storage';
import { getMockAIResponse } from '../lib/ai';
import { ONBOARD_BRIEF } from '../lib/mockData';

export default function Onboard() {
  const nav = useNavigate();
  const user = getUser();
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const isGig = user?.role === 'gig';

  useEffect(() => {
    if (!user) { nav('/'); return; }
    // Seed first AI message
    setMessages([{ from: 'ai', text: getMockAIResponse(isGig ? 'onboard_greet_gig' : 'onboard_greet_resident') }]);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    setTimeout(() => {
      let aiText = '';
      const nextStep = step + 1;
      if (isGig) {
        if (step === 0) aiText = getMockAIResponse('onboard_ask_skills');
        else if (step === 1) aiText = getMockAIResponse('onboard_ask_pricing');
        else aiText = 'Profile created. Your trust score (74) carries over. Welcome aboard, Ramesh.';
      } else {
        if (step === 0) aiText = getMockAIResponse('onboard_confirm_building');
        else if (step === 1) {
          // Day 1 brief — render as multi-line
          aiText = getMockAIResponse('onboard_day1_brief') + '\n\n' + ONBOARD_BRIEF.resident.join('\n');
        } else aiText = 'You\'re all set. Tap below to enter your home dashboard.';
      }
      setMessages((m) => [...m, { from: 'ai', text: aiText }]);
      setStep(nextStep);
    }, 600);
  };

  const finished = step >= 3;

  return (
    <div className="phone-shell flex flex-col" style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Header */}
      <header className="bg-ink px-5 py-4 flex items-center justify-between" style={{ color: 'var(--cream)' }}>
        <span className="font-display text-[20px]" style={{ letterSpacing: '-0.01em' }}>Mohalla</span>
        <div className="flex gap-1.5" data-testid="progress-dots">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 6, height: 6, borderRadius: 99,
                background: step >= i ? 'var(--rust)' : 'rgba(253,248,240,0.25)'
              }}
            />
          ))}
        </div>
      </header>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3" data-testid="onboard-chat">
        {messages.map((m, i) => (
          <div key={i} className={m.from === 'ai' ? '' : 'flex justify-end'}>
            <div className={m.from === 'ai' ? 'bubble-ai whitespace-pre-line fade-up' : 'bubble-user fade-up'}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="hairline-t px-3 pt-3 bg-cream relative z-50" style={{ paddingBottom: 64 }}>
        {finished ? (
          <button
            data-testid="onboard-enter"
            onClick={() => nav('/home')}
            className="btn-rust w-full"
          >
            Enter dashboard
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-full hairline" aria-label="voice">
              <IconMicrophone size={18} stroke={1.7} color="var(--ink2)" />
            </button>
            <input
              data-testid="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your reply…"
              className="flex-1 hairline bg-cream rounded-[99px] px-4 py-2.5 outline-none font-ui text-[14px]"
              style={{ color: 'var(--ink)' }}
            />
            <button
              data-testid="chat-send"
              onClick={send}
              className="p-2.5 rounded-full"
              style={{ background: 'var(--rust)' }}
              aria-label="send"
            >
              <IconArrowUp size={18} stroke={2} color="var(--cream)" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
