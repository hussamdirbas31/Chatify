'use client';
import Image from 'next/image';
import type { PublicUser } from '@/lib/types/types';
import { mockUsers } from '@/lib/mockData';

interface Props {
  user?: PublicUser;
  onEdit?: () => void;
}

export default function AvatarSection({ user, onEdit }: Props) {
  const displayUser = user || mockUsers[0];

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-surface rounded-xl border border-zinc-800">
      <div className="relative w-24 h-24">
        <Image
          src={displayUser.avatar}
          alt={displayUser.name}
          fill
          className="rounded-full object-cover border-2 border-primary/30"
          priority
        />
        {displayUser.lastActive === 'Online' && (
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border border-surface" />
        )}
      </div>
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{displayUser.name}</h1>
            <p className="text-text-secondary">{displayUser.email}</p>
            {displayUser.bio && (
              <p className="text-muted text-sm mt-1">{displayUser.bio}</p>
            )}
          </div>
          {onEdit && (
            <button 
              onClick={onEdit}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-text-primary transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
        
        <div className="mt-4 flex gap-4 text-sm">
          {displayUser.interests && displayUser.interests.length > 0 && (
            <div className="text-text-secondary">
              <span className="font-medium">Interests: </span>
              {displayUser.interests.join(', ')}
            </div>
          )}
          {displayUser.mutualFriends !== undefined && (
            <div className="text-text-secondary">
              <span className="font-medium">Mutual friends: </span>
              {displayUser.mutualFriends}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}