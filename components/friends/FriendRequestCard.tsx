'use client';
import Avatar from '@/components/common/Avatar';
import { useState } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  avatar?: string;
  // Add other user properties as needed
}

interface FriendRequest {
  id: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date | string;
  // Add other request properties as needed
}

interface FriendRequestCardProps {
  request: FriendRequest;
  sender: User;
}

export default function FriendRequestCard({ request, sender }: FriendRequestCardProps) {
  const [status, setStatus] = useState(request.status);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResponse = async (newStatus: 'accepted' | 'declined') => {
    setIsProcessing(true);
    try {
      // TODO: Replace with actual API call
      // await respondToFriendRequest(request.id, newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to respond to friend request:', error);
      // Optionally show error to user
    } finally {
      setIsProcessing(false);
    }
  };

  if (status !== 'pending') return null;

  return (
    <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
      <div className="flex items-center min-w-0">
        <Avatar src={sender.avatar} name={sender.name} size="md" />
        <div className="ml-4 min-w-0">
          <h3 className="text-zinc-100 font-medium truncate">{sender.name}</h3>
          <p className="text-zinc-400 text-sm">Sent you a friend request</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleResponse('accepted')}
          disabled={isProcessing}
          className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition-colors disabled:opacity-50"
          aria-label="Accept friend request"
        >
          <FiCheck size={20} />
        </button>
        <button
          onClick={() => handleResponse('declined')}
          disabled={isProcessing}
          className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors disabled:opacity-50"
          aria-label="Decline friend request"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
}