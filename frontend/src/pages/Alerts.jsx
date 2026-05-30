import React from 'react';
import { IconAlertTriangleFilled, IconSparkles, IconShieldCheck } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { ALERTS } from '../lib/mockData';

export default function Alerts() {
  const active = ALERTS.filter(a => a.status === 'active');
  const resolved = ALERTS.filter(a => a.status === 'resolved');

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="alerts-screen">
      <PageHeader variant="alert" title="Scam radar" subtitle="Neighbourhood immune system" back showCoins={false} right={<span className="pill" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, padding: '3px 9px' }}>{active.length} active</span>} />

      <section className="px-5 pt-5">
        <div className="eyebrow" style={{ color: 'var(--alert)' }}>Active</div>
        <div className="mt-3 space-y-3 stagger">
          {active.map(a => (
            <div
              key={a.id}
              className="card-white bl-alert"
              data-testid={`alert-${a.id}`}
            >
              <div className="flex items-start gap-2">
                <span className="pulse-dot mt-1" style={{ color: 'var(--alert)' }} />
                <div className="flex-1">
                  <div className="font-ui" style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{a.type}</div>
                  <p className="font-ui mt-1" style={{ fontSize: 12.5, color: 'var(--ink2)', lineHeight: 1.5 }}>{a.description}</p>
                  <div
                    className="mt-2.5 pt-2 flex items-start gap-1.5"
                    style={{ borderTop: '1px solid var(--sand3)' }}
                  >
                    <IconSparkles size={11} color="var(--moss)" />
                    <p className="font-ui" style={{ fontSize: 11.5, color: 'var(--ink3)', fontStyle: 'italic' }}>{a.aiNote}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-ui" style={{ fontSize: 10.5, color: 'var(--ink3)' }}>
                      {a.reportCount} reports · {a.timestamp}
                    </span>
                    <button
                      className="pill"
                      data-testid={`saw-${a.id}`}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--alert)',
                        color: 'var(--alert)',
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 500
                      }}
                    >
                      I saw this too
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6">
        <div className="eyebrow">Resolved</div>
        <div className="mt-3 space-y-2">
          {resolved.map(a => (
            <div key={a.id} className="card opacity-70" data-testid={`resolved-${a.id}`}>
              <div className="flex items-center gap-1.5">
                <IconShieldCheck size={13} color="var(--moss)" />
                <span
                  className="font-ui"
                  style={{ fontSize: 13, color: 'var(--ink3)', textDecoration: 'line-through' }}
                >
                  {a.type}
                </span>
              </div>
              <p className="font-ui mt-1" style={{ fontSize: 11.5, color: 'var(--ink3)', fontStyle: 'italic' }}>{a.aiNote}</p>
              <div className="font-ui mt-1" style={{ fontSize: 10.5, color: 'var(--ink3)' }}>{a.timestamp}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6 mb-10">
        <button data-testid="report-btn" className="btn btn-outline w-full" style={{ borderColor: 'var(--rust)', color: 'var(--rust)', height: 46 }}>
          Report something suspicious
        </button>
      </section>
    </div>
  );
}
