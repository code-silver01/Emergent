import React from 'react';
import { IconAlertTriangleFilled, IconSparkles, IconShieldCheck } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_ALERTS } from '../lib/mockData';

export default function Alerts() {
  const active = SEED_ALERTS.filter(a => a.status === 'active');
  const resolved = SEED_ALERTS.filter(a => a.status === 'resolved');

  return (
    <div className="bg-cream min-h-screen" data-testid="alerts-screen">
      <PageHeader variant="ink" title="Scam radar" subtitle="What's making rounds in your area" back />

      {/* Active alerts */}
      <section className="px-5 pt-5">
        <div className="eyebrow" style={{ color: 'var(--alert)' }}>Active · in your area</div>
        <div className="mt-3 space-y-3" data-testid="active-alerts">
          {active.map((a) => (
            <div
              key={a.id}
              className="card-cream p-4"
              style={{ borderLeft: '3px solid var(--alert)' }}
              data-testid={`alert-${a.id}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <IconAlertTriangleFilled size={14} color="var(--alert)" />
                    <span className="font-display-i text-[16px]" style={{ color: 'var(--ink)' }}>{a.type}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] font-ui" style={{ color: 'var(--ink2)' }}>{a.description}</p>
                </div>
                <span className="pill shrink-0" style={{ background: 'rgba(192,57,43,0.12)', color: 'var(--alert)' }}>
                  {a.reportCount} reports
                </span>
              </div>
              <div className="mt-3 hairline-t pt-2.5 flex items-start gap-1.5">
                <IconSparkles size={11} color="var(--moss)" />
                <p className="text-[11.5px]" style={{ color: 'var(--ink2)' }}>{a.aiNote}</p>
              </div>
              <div className="text-[10.5px] mt-2" style={{ color: 'var(--ink2)' }}>{a.timestamp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Resolved */}
      <section className="px-5 mt-6">
        <div className="eyebrow">Resolved</div>
        <div className="mt-3 space-y-2" data-testid="resolved-alerts">
          {resolved.map((a) => (
            <div key={a.id} className="card-cream p-3 opacity-60" data-testid={`resolved-${a.id}`}>
              <div className="flex items-center gap-1.5">
                <IconShieldCheck size={13} color="var(--moss)" />
                <span className="font-ui text-[13px] line-through decoration-1" style={{ color: 'var(--ink2)' }}>{a.type}</span>
              </div>
              <p className="text-[11.5px] mt-1" style={{ color: 'var(--ink2)' }}>{a.aiNote}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-7 mb-10">
        <button className="btn-outline w-full" data-testid="report-btn">Report suspicious activity</button>
      </section>
    </div>
  );
}
