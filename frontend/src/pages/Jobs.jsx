import React, { useState } from 'react';
import { IconCheck, IconX, IconMessageDots, IconSparkles } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { SEED_JOBS } from '../lib/mockData';

export default function Jobs() {
  const [statuses, setStatuses] = useState(
    SEED_JOBS.reduce((acc, j) => ({ ...acc, [j.id]: j.status }), {})
  );

  const update = (id, status) => setStatuses(s => ({ ...s, [id]: status }));

  const pending = SEED_JOBS.filter(j => statuses[j.id] === 'pending');
  const handled = SEED_JOBS.filter(j => statuses[j.id] !== 'pending');

  return (
    <div className="bg-cream min-h-screen" data-testid="jobs-screen">
      <PageHeader variant="moss" title="Job queue" subtitle={`${pending.length} pending · matched to your skills`} />

      <section className="px-5 pt-5">
        <div className="eyebrow">Pending</div>
        <div className="mt-3 space-y-3" data-testid="pending-jobs">
          {pending.length === 0 && (
            <div className="card-soft p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <IconSparkles size={12} color="var(--moss)" />
                <span className="eyebrow" style={{ color: 'var(--moss)' }}>AI</span>
              </div>
              <p className="text-[13px]" style={{ color: 'var(--ink)' }}>
                Quiet for now. Festival week starts Thursday — I'll route the surge to you first.
              </p>
            </div>
          )}
          {pending.map(j => (
            <div key={j.id} className="card-cream p-4" data-testid={`job-${j.id}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display-i text-[17px]" style={{ color: 'var(--ink)' }}>{j.requester}, Flat {j.requesterFlat}</div>
                  <p className="text-[13px] mt-1 font-ui" style={{ color: 'var(--ink2)' }}>{j.jobType}</p>
                </div>
                <span className="pill" style={{
                  background: j.urgency === 'Today' ? 'rgba(192,57,43,0.12)' : 'var(--sand2)',
                  color: j.urgency === 'Today' ? 'var(--alert)' : 'var(--ink2)'
                }}>
                  {j.urgency}
                </span>
              </div>
              <p className="text-[11.5px] mt-2" style={{ color: 'var(--ink2)' }}>
                Found you {j.foundVia}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="btn-rust flex-1 py-2.5 text-[13px]" onClick={() => update(j.id, 'accepted')} data-testid={`accept-${j.id}`}>
                  <IconCheck size={14} className="inline mr-1" /> Accept
                </button>
                <button className="btn-outline flex-1 py-2.5 text-[13px]" onClick={() => update(j.id, 'passed')} data-testid={`pass-${j.id}`}>
                  <IconX size={14} className="inline mr-1" /> Pass
                </button>
                <button className="btn-outline py-2.5 px-3 text-[13px]" data-testid={`msg-${j.id}`}>
                  <IconMessageDots size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {handled.length > 0 && (
        <section className="px-5 mt-6 mb-10">
          <div className="eyebrow">History</div>
          <div className="mt-3 space-y-2" data-testid="handled-jobs">
            {handled.map(j => (
              <div key={j.id} className="card-cream p-3 opacity-70">
                <div className="flex items-center justify-between">
                  <span className="text-[13px]" style={{ color: 'var(--ink2)' }}>{j.requester} · {j.jobType.slice(0, 30)}…</span>
                  <span className="pill" style={{
                    background: statuses[j.id] === 'accepted' ? 'rgba(90,155,92,0.18)' : 'var(--sand2)',
                    color: statuses[j.id] === 'accepted' ? 'var(--moss)' : 'var(--ink2)'
                  }}>
                    {statuses[j.id]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
