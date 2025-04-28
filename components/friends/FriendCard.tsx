'use client';
import Avatar from '@/components/common/Avatar';
import Link from 'next/link';
import FriendButton from './FriendButton';

interface FriendCardProps {
  user: any;
  showMutualFriends?: boolean;
  actionType?: 'add' | 'remove' | 'respond';
}

export default function FriendCard({ 
  user, 
  showMutualFriends = false,
  actionType = 'add'
}: FriendCardProps) {
  const currentUser = { id: 'current_user' }; // Replace with real auth

  return (
    <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between">
      <Link href={`/dashboard/users/${user.id}`} className="flex items-center flex-1">
        <Avatar src={user.avatar} name={user.name} />
        <div className="ml-4">
          <h3 className="text-zinc-100">{user.name}</h3>
          {showMutualFriends && user.mutualFriends > 0 && (
            <p className="text-zinc-400 text-sm">
              {user.mutualFriends} mutual friends
            </p>
          )}
        </div>
      </Link>

      <div className="ml-4">
        <FriendButton
          currentUserId={currentUser.id}
          targetUserId={user.id}
          initialStatus={user.friendshipStatus}
          actionType={actionType}
        />
      </div>
    </div>
  );
}
