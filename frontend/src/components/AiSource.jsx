import React from 'react';
import { IconSparkles } from '@tabler/icons-react';

export default function AiSource({ children }) {
  return (
    <span
      className="font-ui inline-flex items-center gap-1"
      style={{ fontSize: 10, color: 'var(--ink3)', fontStyle: 'italic', marginTop: 2 }}
    >
      <IconSparkles size={9} stroke={1.6} />
      Source: {children}
    </span>
  );
}
