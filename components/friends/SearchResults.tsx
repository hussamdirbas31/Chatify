// components/friends/SearchResults.tsx
'use client';
import { PublicUser } from '@/lib/types/types';
import UserCard from '@/components/friends/UserCard';

interface SearchResultsProps {
  results: PublicUser[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mt-4 space-y-4">
      {results.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          actionType="add"
          showMutualFriends
        />
      ))}
    </div>
  );
}