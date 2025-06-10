'use client';
import { FaUserPlus, FaCheck, FaClock } from 'react-icons/fa';
import { FaUserXmark } from "react-icons/fa6";

type FriendshipStatus = 'none' | 'pending' | 'friend' | 'rejected';

interface FriendButtonProps {
  status?: FriendshipStatus;
}

export default function FriendButton({
  status = 'none'
}: FriendButtonProps) {
  const buttonConfigs = {
    none: {
      text: 'Add Friend',
      icon: <FaUserPlus size={16} />,
      className: 'bg-blue-600 hover:bg-blue-700'
    },
    pending: {
      text: 'Pending',
      icon: <FaClock size={16} />,
      className: 'bg-zinc-700 hover:bg-zinc-600'
    },
    friend: {
      text: 'Friends',
      icon: <FaCheck size={16} />,
      className: 'bg-green-600 hover:bg-green-700'
    },
    rejected: {
      text: 'Try Again',
      icon: <FaUserXmark size={16} />,
      className: 'bg-red-600 hover:bg-red-700'
    }
  };

  const { text, icon, className } = buttonConfigs[status] || buttonConfigs.none;

  return (
    <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-white transition-colors ${className}`}>
      {icon}
      <span>{text}</span>
    </div>
  );
}