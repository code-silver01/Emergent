import React from 'react';
import { IconHexagon } from '@tabler/icons-react';

export const CoinBadge = ({ value, small = false, testId = 'coin-badge' }) => {
  return (
    <span className="coin-badge" data-testid={testId} style={small ? { padding: '3px 8px', fontSize: 11 } : {}}>
      <IconHexagon size={small ? 12 : 14} stroke={2} color="var(--gold2)" />
      {value} <span style={{ opacity: 0.7, marginLeft: 2 }}>coins</span>
    </span>
  );
};

export default CoinBadge;
