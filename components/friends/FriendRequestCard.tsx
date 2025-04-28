// components/friends/FriendRequestCard.tsx
'use client';
import Avatar from '@/components/common/Avatar';
import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

export default function FriendRequestCard({ request, sender }: any) {
  const [status, setStatus] = useState(request.status);

  const handleResponse = (newStatus: string) => {
    // In real app, call API to update request status
    setStatus(newStatus);
  };

  if (status !== 'pending') return null;

  return (
    <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between">
      <div className="flex items-center">
        <Avatar src={sender.avatar} name={sender.name}  />
        <div className="ml-4">
          <h3 className="text-zinc-100">{sender.name}</h3>
          <p className="text-zinc-400 text-sm">Sent you a friend request</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleResponse('accepted')}
          className="p-2 bg-green-600 hover:bg-green-700 rounded-full"
        >
          <FiCheck size={20} />
        </button>
        <button
          onClick={() => handleResponse('declined')}
          className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
}