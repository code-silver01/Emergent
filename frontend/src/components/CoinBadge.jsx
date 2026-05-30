import React from 'react';
import { IconHexagon } from '@tabler/icons-react';

export default function CoinBadge({ value, small = false, testId = 'coin-badge' }) {
  return (
    <span
      className="coin-badge"
      data-testid={testId}
      style={small ? { padding: '3px 9px 3px 7px', fontSize: 11 } : {}}
    >
      <IconHexagon size={small ? 11 : 13} stroke={2} color="var(--gold2)" fill="var(--gold3)" />
      {value} <span style={{ opacity: 0.7, marginLeft: 2, fontWeight: 400 }}>coins</span>
    </span>
  );
}
