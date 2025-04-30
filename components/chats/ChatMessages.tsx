import MessageBubble from './Message'
import { Message } from '@/lib/mockchat/chat'

interface ChatMessagesProps {
  messages: Message[]
  currentUserId: string
}

export default function ChatMessages({ messages, currentUserId }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-zinc-900/20 to-zinc-900/10">
      {messages.length > 0 ? (
        messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.senderId === currentUserId}
          />
        ))
      ) : (
        <div className="h-full flex items-center justify-center text-zinc-400">
          <p>لا توجد رسائل بعد. ابدأ المحادثة الآن!</p>
        </div>
      )}
    </div>
  )
}