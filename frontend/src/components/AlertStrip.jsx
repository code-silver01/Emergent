import React from 'react';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const AlertStrip = ({ text, to = '/alerts' }) => {
  return (
    <Link
      to={to}
      data-testid="alert-strip"
      className="flex items-center gap-2 px-4"
      style={{
        background: 'var(--alert)',
        color: 'var(--cream)',
        height: 36,
        fontSize: 12.5,
        fontWeight: 500,
        letterSpacing: 0.01
      }}
    >
      <IconAlertTriangleFilled size={15} />
      <span className="truncate">{text}</span>
    </Link>
  );
};

export default AlertStrip;
