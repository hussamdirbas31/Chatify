// components/friends/SuggestedFriends.tsx
'use client';
import { mockUsers, getCurrentUser } from '@/lib/mockData';
import { useState, useEffect, useMemo } from 'react';
import FriendCard from '@/components/friends/FriendCard';
import { PublicUser } from '@/lib/types/types';

export default function SuggestedFriends() {
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [suggestions, setSuggestions] = useState<PublicUser[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const getSuggestedFriends = () => {
      return mockUsers
        .filter(user => 
          user.id !== currentUser.id &&
          !currentUser.following?.includes(user.id) &&
          (user.mutualFriends || 0) > 0
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    };

    setSuggestions(getSuggestedFriends());
  }, [currentUser]);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">Suggested Friends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map(user => (
          <FriendCard
            key={user.id}
            user={user}
            showMutualFriends
          />
        ))}
      </div>
    </div>
  );
}