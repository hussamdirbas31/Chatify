'use client';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { memo } from 'react';

interface NavItemProps {
  item: {
    href: string;
    icon: string;
    label: string;
    active?: boolean;
  };
}

const NavItem = ({ item }: NavItemProps) => {
  return (
    <Link href={item.href}>
      <Button 
        variant="nav"
        className={`w-full justify-start p-3 rounded-xl transition-all group
          ${item.active ? 
            'bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/10 border-primary/30 text-text-primary' : 
            'hover:bg-surface/80 border-transparent hover:border-primary/30 text-text-secondary hover:text-text-primary'
          } border`}
        aria-label={item.label}
      >
        <svg className={`w-5 h-5 transition-colors
          ${item.active ? 'text-primary' : 'text-muted group-hover:text-secondary'}`}
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
        </svg>
        <span className={`text-sm font-medium transition-colors ml-3`}>
          {item.label}
        </span>
      </Button>
    </Link>
  );
};

export default memo(NavItem);