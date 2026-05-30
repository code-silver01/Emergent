import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import CoinBadge from './CoinBadge';
import { loadUser } from '../lib/storage';
import { loadDemo } from '../lib/storage';

export default function PageHeader({ title, subtitle, variant = 'ink', back = false, right = null, showCoins = true, tall = false }) {
  const nav = useNavigate();
  const user = loadUser();
  const demo = loadDemo();
  const coins = user?.id === 'aditya' ? demo.adityaCoins : (user?.coins ?? 0);

  let cls = 'dark-header';
  if (variant === 'moss') cls = 'moss-header';
  else if (variant === 'dark-warm') cls = 'dark-warm-header';
  else if (variant === 'alert') cls = '';

  const bgStyle = variant === 'alert' ? { background: 'var(--alert)', color: '#fff' } : {};

  return (
    <header
      className={`px-5 pt-6 pb-5 ${cls}`}
      style={bgStyle}
      data-testid="page-header"
    >
      <div className="relative flex items-start justify-between gap-3" style={{ zIndex: 2 }}>
        <div className="flex-1 min-w-0">
          {back && (
            <button
              data-testid="back-btn"
              onClick={() => nav(-1)}
              className="mb-3 inline-flex items-center gap-1 font-ui"
              style={{ fontSize: 12, opacity: 0.85, color: 'inherit' }}
            >
              <IconArrowLeft size={15} /> Back
            </button>
          )}
          <h1
            className="font-display-i"
            style={{ fontSize: tall ? 30 : 24, lineHeight: 1.15, color: 'inherit' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 font-ui" style={{ fontSize: 12.5, opacity: 0.7, lineHeight: 1.4 }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {showCoins && user && <CoinBadge value={coins} />}
          {right}
        </div>
      </div>
    </header>
  );
}
