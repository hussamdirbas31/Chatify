// components/chat/Message.tsx
import { Message } from '@/lib/mockchat/chat';
import Avatar from '@/components/common/Avatar';
import { mockUsers } from '@/lib/mockchat/chat';

interface MessageProps {
  message: Message;
  isCurrentUser: boolean;
}

export default function MessageBubble({ message, isCurrentUser }: MessageProps) {
  const sender = mockUsers.find(u => u.id === message.senderId);
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs md:max-w-md rounded-lg p-3 ${
          isCurrentUser 
            ? 'bg-indigo-600 rounded-br-none' 
            : 'bg-zinc-800 rounded-bl-none'
        }`}
      >
        {sender && !isCurrentUser && (
          <p className="text-xs font-medium text-indigo-300 mb-1">{sender.name}</p>
        )}
        <p className="text-sm">{message.content}</p>
        <p className="text-xs text-zinc-300 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}