// app/dashboard/friends/requests/page.tsx
import { notFound } from 'next/navigation';
import { mockFriendRequests, mockUsers, getCurrentUser } from '@/lib/mockData';
import Button from '@/components/common/Button';
import UserCard from '@/components/friends/UserCard';

export default function FriendRequestsPage() {
  const currentUser = getCurrentUser();
  const requests = mockFriendRequests.filter(
    req => req.receiverId === currentUser.id && req.status === 'pending'
  );

  if (!currentUser) notFound();

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Friend Requests</h1>
        <Button 
          variant="secondary" 
          size="sm"
          asLink
          href="/dashboard/friends"
        >
          Back to Friends
        </Button>
      </div>
      
      {requests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary">No pending friend requests</p>
          <Button 
            variant="primary"
            className="mt-4"
            asLink
            href="/dashboard/friends"
          >
            Find Friends
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map(request => {
            const sender = mockUsers.find(u => u.id === request.senderId);
            if (!sender) return null;
            
            return (
              <UserCard
                key={request.id}
                user={sender}
                actionType="respond"
                showMutualFriends
              />
            );
          })}
        </div>
      )}
    </div>
  );
}