'use client';
import { useState } from 'react';
import { FaUserPlus, FaCheck, FaClock } from 'react-icons/fa';
import { FaUserXmark } from "react-icons/fa6";

type FriendshipStatus = 'none' | 'pending' | 'friend' | 'rejected';
type FriendActionType = 'add' | 'remove' | 'respond';

interface FriendButtonProps {
  initialStatus: FriendshipStatus;
  actionType?: FriendActionType;
}

interface ButtonConfig {
  text: string;
  icon: React.ReactNode;
  className: string;
}

export default function FriendButton({
  initialStatus,
  actionType = 'add'
}: FriendButtonProps) {
  const [status, setStatus] = useState<FriendshipStatus>(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const newStatus = getNewStatus(status, actionType);
      // TODO: Implement actual API call
      // await updateFriendshipStatus(newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error('Friendship update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNewStatus = (currentStatus: FriendshipStatus, action: FriendActionType): FriendshipStatus => {
    if (action === 'remove') return 'none';
    
    switch (currentStatus) {
      case 'none': return 'pending';
      case 'pending': return 'none';
      case 'friend': return 'none';
      case 'rejected': return 'pending';
      default: return currentStatus;
    }
  };

  const getButtonConfig = (): ButtonConfig => {
    const baseClasses = 'px-4 py-2 rounded-full flex items-center gap-2 text-white transition-colors';
    
    switch (status) {
      case 'none':
        return {
          text: actionType === 'remove' ? 'Remove' : 'Add Friend',
          icon: <FaUserPlus size={16} />,
          className: `${baseClasses} ${actionType === 'remove' 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700'}`
        };
      case 'pending':
        return {
          text: 'Pending',
          icon: <FaClock size={16} />,
          className: `${baseClasses} bg-zinc-700 hover:bg-zinc-600`
        };
      case 'friend':
        return {
          text: 'Friends',
          icon: <FaCheck size={16} />,
          className: `${baseClasses} bg-green-600 hover:bg-green-700`
        };
      case 'rejected':
        return {
          text: 'Try Again',
          icon: <FaUserXmark size={16} />,
          className: `${baseClasses} bg-red-600 hover:bg-red-700`
        };
      default:
        return {
          text: 'Add Friend',
          icon: <FaUserPlus size={16} />,
          className: `${baseClasses} bg-blue-600 hover:bg-blue-700`
        };
    }
  };

  const { text, icon, className } = getButtonConfig();

  return (
    <button
      onClick={handleAction}
      disabled={isLoading}
      className={`${className} ${isLoading ? 'opacity-70' : ''}`}
      aria-label={text}
    >
      {isLoading ? (
        <span className="animate-spin">
          <FaClock size={16} />
        </span>
      ) : (
        icon
      )}
      <span>{text}</span>
    </button>
  );
}