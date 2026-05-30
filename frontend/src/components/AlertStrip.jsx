import React from 'react';
import { Link } from 'react-router-dom';
import { IconAlertTriangleFilled, IconChevronRight } from '@tabler/icons-react';

export default function AlertStrip({ text, to = '/alerts' }) {
  return (
    <Link
      to={to}
      data-testid="alert-strip"
      className="flex items-center gap-2 px-5"
      style={{
        background: 'var(--alert)',
        color: '#fff',
        height: 40,
        fontSize: 12.5,
        fontWeight: 500,
        letterSpacing: 0.01
      }}
    >
      <span className="pulse-dot" />
      <IconAlertTriangleFilled size={14} />
      <span className="flex-1 truncate">{text}</span>
      <IconChevronRight size={14} style={{ opacity: 0.8 }} />
    </Link>
  );
}
