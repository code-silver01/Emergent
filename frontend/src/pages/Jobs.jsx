import React, { useState } from 'react';
import { IconCheck, IconX, IconMessage, IconSparkles } from '@tabler/icons-react';
import PageHeader from '../components/PageHeader';
import { JOBS } from '../lib/mockData';
import { loadDemo, patchDemo } from '../lib/storage';

export default function Jobs() {
  const demo = loadDemo();
  const [accepted, setAccepted] = useState(demo.acceptedJobs || []);
  const [passed, setPassed] = useState(demo.passedJobs || []);

  const update = (id, kind) => {
    if (kind === 'accept') {
      const next = [...accepted, id];
      setAccepted(next);
      patchDemo({ acceptedJobs: next });
    } else {
      const next = [...passed, id];
      setPassed(next);
      patchDemo({ passedJobs: next });
    }
  };

  const pending = JOBS.filter(j => !accepted.includes(j.id) && !passed.includes(j.id));
  const handled = JOBS.filter(j => accepted.includes(j.id) || passed.includes(j.id));

  return (
    <div className="bg-cream" style={{ minHeight: '100vh' }} data-testid="jobs">
      <PageHeader variant="moss" title="Job queue" subtitle={`${pending.length} pending · matched to your skills`} />

      <section className="px-5 pt-5">
        <div className="eyebrow">Pending</div>
        <div className="mt-3 space-y-3 stagger">
          {pending.length === 0 ? (
            <div className="card bl-moss">
              <div className="flex items-center gap-1.5 mb-1">
                <IconSparkles size={12} color="var(--moss)" />
                <span className="eyebrow" style={{ color: 'var(--moss)' }}>AI</span>
              </div>
              <p className="font-ui" style={{ fontSize: 13, color: 'var(--ink)' }}>
                Quiet for now. Festival week starts Thursday — I'll route the surge to you first.
              </p>
            </div>
          ) : (
            pending.map(j => (
              <div key={j.id} className="card-white" data-testid={`job-${j.id}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-ui" style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)' }}>
                      {j.requester}, {j.requesterFlat}
                    </div>
                    <p className="font-ui mt-1" style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.45 }}>{j.jobType}</p>
                  </div>
                  <span
                    className="pill shrink-0"
                    style={{
                      background: j.urgency === 'Today' ? 'var(--alert2)' : 'var(--sand2)',
                      color: j.urgency === 'Today' ? 'var(--alert)' : 'var(--ink3)',
                      fontSize: 10.5
                    }}
                  >
                    {j.urgency}
                  </span>
                </div>
                <p className="font-ui mt-2" style={{ fontSize: 10.5, color: 'var(--ink3)', fontStyle: 'italic' }}>
                  Found you via {j.foundVia}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => update(j.id, 'accept')}
                    data-testid={`accept-${j.id}`}
                    className="btn btn-moss flex-1"
                    style={{ height: 38, fontSize: 13 }}
                  >
                    <IconCheck size={14} /> Accept
                  </button>
                  <button
                    onClick={() => update(j.id, 'pass')}
                    data-testid={`pass-${j.id}`}
                    className="btn btn-outline flex-1"
                    style={{ height: 38, fontSize: 13 }}
                  >
                    <IconX size={14} /> Pass
                  </button>
                  <button className="btn btn-outline" style={{ height: 38, padding: '0 12px' }}>
                    <IconMessage size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {handled.length > 0 && (
        <section className="px-5 mt-6 mb-12">
          <div className="eyebrow">History</div>
          <div className="mt-3 space-y-2" data-testid="history">
            {handled.map(j => (
              <div key={j.id} className="card opacity-70 flex items-center justify-between">
                <span className="font-ui" style={{ fontSize: 12.5, color: 'var(--ink3)' }}>
                  {j.requester} · {j.jobType.slice(0, 28)}…
                </span>
                <span
                  className="pill"
                  style={{
                    background: accepted.includes(j.id) ? 'var(--moss3)' : 'var(--sand2)',
                    color: accepted.includes(j.id) ? 'var(--moss)' : 'var(--ink3)',
                    fontSize: 10.5
                  }}
                >
                  {accepted.includes(j.id) ? 'Accepted' : 'Passed'}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
