import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconHome2, IconBriefcase2, IconUsers, IconArrowRight, IconCircle, IconCircleCheckFilled } from '@tabler/icons-react';
import { USERS } from '../lib/mockData';
import { saveUser, getPendingPhone, patchDemo } from '../lib/storage';

const ROLES = [
  { id: 'resident', title: 'I live here', sub: 'Get recommendations, barter, stay safe', Icon: IconHome2, color: 'var(--rust)', bg: 'var(--rust3)' },
  { id: 'gig', title: 'I offer services', sub: 'Build reputation, get customers, earn coins', Icon: IconBriefcase2, color: 'var(--moss)', bg: 'var(--moss3)' },
  { id: 'both', title: "I'm a neighbour who also works", sub: 'Full access to both modes', Icon: IconUsers, color: 'var(--gold2)', bg: 'var(--gold3)' }
];

export default function RoleSelect() {
  const nav = useNavigate();
  const [selected, setSelected] = useState('both'); // Aditya default
  const phone = getPendingPhone();

  const proceed = () => {
    // Create Aditya user (the demo's primary new resident)
    const u = { ...USERS.aditya, phone: phone || USERS.aditya.phone, role: selected };
    saveUser(u);
    patchDemo({ adityaCoins: 0, adityaOnboarded: false });
    nav('/onboard/resident');
  };

  return (
    <div
      className="phone-shell flex flex-col"
      style={{ background: 'var(--ink)', color: '#fff' }}
      data-testid="role-screen"
    >
      <div className="px-7 pt-16">
        <h1 className="font-display-i" style={{ fontSize: 30, lineHeight: 1.15 }}>
          How do you want to show up?
        </h1>
        <p className="mt-3 font-ui" style={{ fontSize: 13, color: 'rgba(244,237,224,0.65)', fontWeight: 300 }}>
          You can always change this later.
        </p>
      </div>

      <div className="px-5 mt-10 space-y-3 stagger">
        {ROLES.map((r) => {
          const isSel = selected === r.id;
          return (
            <button
              key={r.id}
              data-testid={`role-${r.id}`}
              onClick={() => setSelected(r.id)}
              className="w-full flex items-center gap-3 p-4"
              style={{
                background: isSel ? '#fff' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${isSel ? (r.id === 'gig' ? 'var(--moss)' : r.id === 'resident' ? 'var(--rust)' : 'var(--gold2)') : 'rgba(255,255,255,0.10)'}`,
                borderRadius: 'var(--radius)',
                transition: 'all 0.2s ease',
                color: isSel ? 'var(--ink)' : '#fff',
                textAlign: 'left'
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: isSel ? r.bg : 'rgba(255,255,255,0.06)'
                }}
              >
                <r.Icon size={22} stroke={1.7} color={r.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-ui" style={{ fontSize: 15.5, fontWeight: 600 }}>{r.title}</div>
                <div
                  className="font-ui mt-0.5"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 300,
                    color: isSel ? 'var(--ink3)' : 'rgba(244,237,224,0.55)'
                  }}
                >
                  {r.sub}
                </div>
              </div>
              {isSel ? (
                <IconCircleCheckFilled size={20} color={r.id === 'gig' ? 'var(--moss)' : r.id === 'resident' ? 'var(--rust)' : 'var(--gold2)'} />
              ) : (
                <IconCircle size={20} color="rgba(255,255,255,0.3)" stroke={1.6} />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex-1" />
      <div className="px-7 pb-12">
        <button
          onClick={proceed}
          disabled={!selected}
          data-testid="role-continue"
          className="btn btn-rust w-full"
          style={{ height: 56 }}
        >
          Let's go <IconArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
