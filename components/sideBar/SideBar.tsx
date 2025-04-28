'use client';
import NavItem from './NavItem';
import Badge from './Badge';
import Button from '@/components/common/Button';
import LogoutButton from '@/components/common/LogoutButton';
import Link from 'next/link';
import { useMemo } from 'react';

export default function Sidebar() {
  const navItems = useMemo(() => [
    { 
      href: '/dashboard/profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      label: 'Profile'
    },
    {
      href: '/dashboard/chats',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      label: 'Chats'
    },
    {
      href: '/dashboard/feeds',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      label: 'Posts'
    },
    {
      href: '/dashboard/friends',
      icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      label: 'Friends',
      active: true
    },
    {
      href: '/dashboard/profileSettings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      label: 'Settings'
    }
  ], []);

  return (
    <aside className="w-full h-full bg-surface border-r border-zinc-800 p-6 flex flex-col relative
      before:absolute before:inset-0 before:bg-hero-gradient before:opacity-10 before:-z-10">
      <div className="flex flex-col gap-8 flex-grow">
        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}

          <Link href="/dashboard/friends/requests">
            <Button
              variant="nav"
              className="w-full justify-start gap-3 p-3 hover:bg-zinc-900/80 rounded-xl transition-all
                border border-transparent hover:border-accent/30 relative group"
              aria-label="Friend Requests"
            >
              <svg className="w-5 h-5 text-accent group-hover:text-pink-300 transition-colors"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m5-6a4 4 0 11-8 0 4 4 0 018 0zM17 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              <span className="text-text-secondary group-hover:text-text-primary text-sm font-medium transition-colors">
                Friend Requests
              </span>
              <Badge count={3} />
            </Button>
          </Link>
        </nav>

        <div className="mt-auto pt-4 border-t border-zinc-800/60">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}