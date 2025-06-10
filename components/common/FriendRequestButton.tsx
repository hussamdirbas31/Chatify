'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { mockFriendRequests } from '@/lib/mockData';

export default function FriendRequestButton() {
  const currentUserId = '1';
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setPendingCount(
      mockFriendRequests.filter(
        (req) => req.receiverId === currentUserId && req.status === 'pending'
      ).length
    );
  }, []);

  return (
    <Link href="/dashboard/friends/requests" className="relative inline-block p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
      </svg>
      {pendingCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs text-white bg-red-500 rounded-full">
          {pendingCount}
        </span>
      )}
    </Link>
  );
}