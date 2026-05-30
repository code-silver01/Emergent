import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome2, IconMapSearch, IconArrowsExchange2, IconUser, IconBriefcase2, IconChartBarPopular } from '@tabler/icons-react';

export const BottomNav = ({ role = 'resident' }) => {
  const residentItems = [
    { to: '/home', label: 'Home', Icon: IconHome2, id: 'nav-home' },
    { to: '/map', label: 'Map', Icon: IconMapSearch, id: 'nav-map' },
    { to: '/barter', label: 'Barter', Icon: IconArrowsExchange2, id: 'nav-barter' },
    { to: '/me', label: 'Me', Icon: IconUser, id: 'nav-me' }
  ];

  const gigItems = [
    { to: '/home', label: 'Home', Icon: IconHome2, id: 'nav-home' },
    { to: '/jobs', label: 'Jobs', Icon: IconBriefcase2, id: 'nav-jobs' },
    { to: '/reputation', label: 'Rep', Icon: IconChartBarPopular, id: 'nav-rep' },
    { to: '/barter', label: 'Barter', Icon: IconArrowsExchange2, id: 'nav-barter' },
    { to: '/me', label: 'Me', Icon: IconUser, id: 'nav-me' }
  ];

  const items = role === 'gig' ? gigItems : residentItems;

  return (
    <nav
      data-testid="bottom-nav"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-cream hairline-t"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 10000 }}
    >
      <div className="flex items-stretch justify-around px-2 pt-2 pb-2">
        {items.map(({ to, label, Icon, id }) => (
          <NavLink
            key={to}
            to={to}
            data-testid={id}
            className="flex-1 flex flex-col items-center text-[10px] font-medium"
          >
            {({ isActive }) => (
              <>
                <div className="nav-active-pill" style={{ opacity: isActive ? 1 : 0 }} />
                <Icon size={22} stroke={1.6} color={isActive ? 'var(--rust)' : 'var(--ink2)'} />
                <span className="mt-1" style={{ color: isActive ? 'var(--rust)' : 'var(--ink2)' }}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
