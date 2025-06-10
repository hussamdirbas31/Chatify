// components/friends/CurrentFriends.tsx
import { mockUsers } from '@/lib/mockData';
import FriendCard from '@/components/friends/FriendCard';

export default function CurrentFriends() {
  const friends = mockUsers.filter(
    user => user.friendshipStatus === 'friend'
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-zinc-100 mb-4">
        Your Friends ({friends.length})
      </h2>
      {friends.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map(friend => (
            <FriendCard 
              key={friend.id} 
              user={friend} 
            />
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">
          You haven&apos;t added any friends yet
        </p>
      )}
    </div>
  );
}