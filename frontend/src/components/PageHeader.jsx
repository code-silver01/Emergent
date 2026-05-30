import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@tabler/icons-react';
import CoinBadge from './CoinBadge';
import { getUser } from '../lib/storage';

/**
 * Header for in-app screens.
 * variant: 'ink' (resident dark) | 'moss' (gig green) | 'dark-warm' (#2a1f0e)
 */
export const PageHeader = ({ title, subtitle, variant = 'ink', back = false, right = null, showCoins = true }) => {
  const nav = useNavigate();
  const user = getUser();
  const bg = variant === 'moss' ? 'var(--moss)' : variant === 'dark-warm' ? 'var(--ink3)' : 'var(--ink)';

  return (
    <header
      className="px-5 pt-5 pb-5"
      style={{ background: bg, color: 'var(--cream)' }}
      data-testid="page-header"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {back && (
            <button
              data-testid="back-btn"
              onClick={() => nav(-1)}
              className="mb-3 inline-flex items-center gap-1 text-[12px] opacity-80"
              style={{ color: 'var(--cream)' }}
            >
              <IconArrowLeft size={16} /> Back
            </button>
          )}
          <h1 className="font-display-i text-[28px] leading-tight" style={{ color: 'var(--cream)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-[12.5px] font-ui" style={{ color: 'rgba(253,248,240,0.7)' }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          {showCoins && user?.coins != null && <CoinBadge value={user.coins} />}
          {right}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
