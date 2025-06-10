import { Message } from '@/lib/mockchat/chat'
import { mockUsers } from '@/lib/mockchat/chat'

interface MessageBubbleProps {
  message: Message
  isCurrentUser: boolean
}
export default function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  const sender = mockUsers.find(u => u.id === message.senderId)
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} px-2 md:px-4`}>
      <div 
        className={`max-w-[75%] md:max-w-md rounded-lg p-3 ${
          isCurrentUser 
            ? 'bg-indigo-600 rounded-br-none' 
            : 'bg-zinc-800 rounded-bl-none'
        }`}
      >
        {sender && !isCurrentUser && (
          <p className="text-xs font-medium text-indigo-300 mb-1">{sender.name}</p>
        )}
        <p className="text-sm text-white break-words">{message.content}</p>
        <p className="text-xs text-zinc-300 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  )
}