'use client';
import { useState } from 'react';
import { FaUserPlus , FaCheck , FaClock } from 'react-icons/fa';
import { FaUserXmark } from "react-icons/fa6";

interface FriendButtonProps {
  currentUserId: string;
  targetUserId: string;
  initialStatus: string;
  actionType?: 'add' | 'remove' | 'respond';
}

interface ButtonConfig {
  text: string;
  icon: React.ReactNode;
  className: string;
}

export default function FriendButton({
  currentUserId,
  targetUserId,
  initialStatus,
  actionType = 'add'
}: FriendButtonProps) {
  const [status, setStatus] = useState(initialStatus);

  const handleAction = () => {
    let newStatus = status;

    if (actionType === 'remove') {
      newStatus = 'none';
    } else {
      switch (status) {
        case 'none': newStatus = 'pending'; break;
        case 'pending': newStatus = 'none'; break;
        case 'friend': newStatus = 'none'; break;
        case 'rejected': newStatus = 'pending'; break;
      }
    }

    setStatus(newStatus);
    // In real app, call API here to update status in DB
  };

  const getButtonConfig = (): ButtonConfig => {
    switch (status) {
      case 'none':
        return {
          text: actionType === 'remove' ? 'Remove' : 'Add Friend',
          icon: <FaUserPlus size={16} />,
          className: actionType === 'remove'
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700'
        };
      case 'pending':
        return {
          text: 'Pending',
          icon: <FaClock size={16} />,
          className: 'bg-zinc-700 hover:bg-zinc-600'
        };
      case 'friend':
        return {
          text: 'Friends',
          icon: <FaCheck size={16} />,
          className: 'bg-green-600 hover:bg-green-700'
        };
      case 'rejected':
        return {
          text: 'Try Again',
          icon: <FaUserXmark size={16} />,
          className: 'bg-red-600 hover:bg-red-700'
        };
      default:
        return {
          text: 'Add Friend',
          icon: <FaUserPlus size={16} />,
          className: 'bg-blue-600 hover:bg-blue-700'
        };
    }
  };

  const { text, icon, className } = getButtonConfig();

  return (
    <button
      onClick={handleAction}
      className={`px-4 py-2 rounded-full flex items-center gap-2 text-white transition-colors ${className}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}
