// components/friends/FriendRequestsLink.tsx
import Link from 'next/link';
import { mockFriendRequests } from '@/lib/mockData';

export default function FriendRequestsLink() {
  const pendingRequests = mockFriendRequests.filter(
    req => req.status === 'pending'
  ).length;

  return (
    <Link 
      href="/friends/requests"
      className="block mb-6 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors"
    >
      <div className="flex justify-between items-center">
        <span className="text-zinc-100">Friend Requests</span>
        {pendingRequests > 0 && (
          <span className="bg-purple-600 text-white text-sm px-2 py-1 rounded-full">
            {pendingRequests}
          </span>
        )}
      </div>
    </Link>
  );
}