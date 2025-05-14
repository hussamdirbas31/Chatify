'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, memo } from 'react';
import LogoutButton from '@/components/common/LogoutButton';

const UserIcon = memo(function UserIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
});
UserIcon.displayName = 'UserIcon';

const ChatIcon = memo(function ChatIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
});
ChatIcon.displayName = 'ChatIcon';

const FeedIcon = memo(function FeedIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
});
FeedIcon.displayName = 'FeedIcon';

const SettingsIcon = memo(function SettingsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
});
SettingsIcon.displayName = 'SettingsIcon';

const FriendsIcon = memo(function FriendsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m8-1.13a4 4 0 10-8 0 4 4 0 008 0zM23 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
});
FriendsIcon.displayName = 'FriendsIcon';

const AddFriendsIcon = memo(function AddFriendsIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
  );
});
AddFriendsIcon.displayName = 'AddFriendsIcon';

const MoreIcon = memo(function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted'}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M6 12h.01M12 12v.01M18 12h.01" />
    </svg>
  );
});
MoreIcon.displayName = 'MoreIcon';

export default function MobileNav() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
    { href: '/dashboard/chats', label: 'Chats', icon: ChatIcon },
    { href: '/dashboard/feeds', label: 'Posts', icon: FeedIcon },
    { href: '/dashboard/addFriends', label: 'Add Friends', icon: AddFriendsIcon },
    { href: '/dashboard/profileSettings', label: 'Settings', icon: SettingsIcon },
    { href: '/dashboard/friends', label: 'Friends', icon: FriendsIcon },
  ];

  const visibleItems = navItems.slice(0, 4);
  const hiddenItems = navItems.slice(4);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-surface border-t border-zinc-800 flex justify-around items-center h-16 relative">
      {visibleItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className="flex flex-col items-center flex-1 max-w-[25%] px-1"
          prefetch={false}
        >
          <item.icon active={pathname === item.href} />
          <span className={`text-xs mt-1 leading-tight ${pathname === item.href ? 'text-text-primary' : 'text-text-secondary'}`}>
            {item.label}
          </span>
        </Link>
      ))}

      <div ref={dropdownRef} className="relative flex flex-col items-center flex-1 max-w-[25%] px-1">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label="More options"
          aria-expanded={showDropdown}
          className="flex flex-col items-center w-full"
        >
          <MoreIcon active={showDropdown} />
          <span className={`text-xs mt-1 leading-tight ${showDropdown ? 'text-text-primary' : 'text-text-secondary'}`}>More</span>
        </button>

        {showDropdown && (
          <div className="absolute bottom-16 bg-surface border border-zinc-800 rounded-lg p-2 w-40 z-10 shadow-lg">
            {hiddenItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 text-sm py-2 px-3 rounded-md transition-colors ${pathname === item.href ? 'bg-zinc-900 text-primary' : 'text-text-secondary hover:bg-zinc-900 hover:text-text-primary'}`}
                prefetch={false}
                onClick={() => setShowDropdown(false)}
              >
                <item.icon active={pathname === item.href} />
                {item.label}
              </Link>
            ))}
            <div className="border-t border-zinc-800 my-1" />
            <LogoutButton  />
          </div>
        )}
      </div>
    </nav>
  );
}