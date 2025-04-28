// components/friends/UserCard.tsx
'use client';
import Link from 'next/link';
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import { PublicUser } from '@/lib/types/types';

interface UserCardProps {
  user: PublicUser;
  actionType?: 'add' | 'remove' | 'respond';
  showMutualFriends?: boolean;
}

export default function UserCard({
  user,
  actionType = 'add',
  showMutualFriends = false
}: UserCardProps) {
  return (
    <div className="p-4 bg-surface rounded-xl border border-zinc-800 flex items-center justify-between hover:bg-surface/80 transition-colors">
      <Link 
        href={`/dashboard/users/${user.id}`} 
        className="flex items-center flex-1"
      >
        <Avatar src={user.avatar} name={user.name} />
        <div className="ml-4">
          <h3 className="text-text-primary font-medium">{user.name}</h3>
          {showMutualFriends && user.mutualFriends > 0 && (
            <p className="text-text-secondary text-sm">
              {user.mutualFriends} mutual friends
            </p>
          )}
        </div>
      </Link>
      
      <div className="ml-4">
        <Button 
          variant={actionType === 'remove' ? 'danger' : 'outline'}
          size="sm"
          className="whitespace-nowrap"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle friend action here
          }}
        >
          {actionType === 'add' ? 'Add Friend' : 
           actionType === 'remove' ? 'Remove' : 'Respond'}
        </Button>
      </div>
    </div>
  );
}