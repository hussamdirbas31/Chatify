'use client';
import Avatar from '@/components/common/Avatar';
import Link from 'next/link';
import FriendButton from './FriendButton';

interface User {
  id: string;
  name: string;
  avatar?: string;
  friendshipStatus: 'none' | 'pending' | 'friend' | 'rejected';
  mutualFriends?: number;
  // Add any other user properties you need
}

interface FriendCardProps {
  user: User;
  showMutualFriends?: boolean;
  actionType?: 'add' | 'remove' | 'respond';
}

export default function FriendCard({ 
  user, 
  showMutualFriends = false,
  actionType = 'add'
}: FriendCardProps) {
  return (
    <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
      <Link 
        href={`/dashboard/users/${user.id}`} 
        className="flex items-center flex-1 min-w-0"
        aria-label={`View ${user.name}'s profile`}
      >
        <Avatar src={user.avatar} name={user.name} size="md" />
        <div className="ml-4 min-w-0">
          <h3 className="text-zinc-100 font-medium truncate">{user.name}</h3>
          {showMutualFriends && user.mutualFriends && user.mutualFriends > 0 && (
            <p className="text-zinc-400 text-sm">
              {user.mutualFriends} mutual {user.mutualFriends === 1 ? 'friend' : 'friends'}
            </p>
          )}
        </div>
      </Link>

      <div className="ml-4 flex-shrink-0">
        <FriendButton
          initialStatus={user.friendshipStatus}
          actionType={actionType}
        />
      </div>
    </div>
  );
}