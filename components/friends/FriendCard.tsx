'use client';
import Avatar from '@/components/common/Avatar';
import FriendButton from './FriendButton';

interface User {
  id: string;
  name: string;
  avatar?: string;
  friendshipStatus: 'none' | 'pending' | 'friend' | 'rejected';
  mutualFriends?: number;
}

interface FriendCardProps {
  user: User;
  showMutualFriends?: boolean;
}

export default function FriendCard({ 
  user = {
    id: '1',
    name: 'John Doe',
    avatar: '/default-avatar.jpg',
    friendshipStatus: 'none',
    mutualFriends: 3
  }, 
  showMutualFriends = true
}: FriendCardProps) {
  return (
    <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
      <div className="flex items-center flex-1 min-w-0">
        <Avatar src={user.avatar} name={user.name} size="md" />
        <div className="ml-4 min-w-0">
          <h3 className="text-zinc-100 font-medium truncate">{user.name}</h3>
          {showMutualFriends && user.mutualFriends && user.mutualFriends > 0 && (
            <p className="text-zinc-400 text-sm">
              {user.mutualFriends} mutual {user.mutualFriends === 1 ? 'friend' : 'friends'}
            </p>
          )}
        </div>
      </div>

      <div className="ml-4 flex-shrink-0">
        <FriendButton status={user.friendshipStatus} />
      </div>
    </div>
  );
}