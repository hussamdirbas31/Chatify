'use client';
import { mockUsers, getCurrentUser } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import FriendCard from '@/components/friends/FriendCard';

export default function SuggestedFriends() {
  const currentUser = getCurrentUser();
  const [suggestions, setSuggestions] = useState<typeof mockUsers>([]);

  // Get random suggestions based on mutual friends
  useEffect(() => {
    const mutualFriendsBased = mockUsers
      .filter(user =>
        user.id !== currentUser.id &&
        !currentUser.following.includes(user.id) &&
        user.mutualFriends > 0
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    setSuggestions(mutualFriendsBased);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">Suggested Friends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map(user => (
          <FriendCard
            key={user.id}
            user={user}
            showMutualFriends
            actionType="add"
          />
        ))}
      </div>
    </div>
  );
}
