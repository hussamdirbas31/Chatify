import { mockUsers, mockGroups, mockChats } from '@/lib/mockchat/chat'
import ChatHeader from '@/components/chats/ChatHeader'
import ChatMessages from '@/components/chats/ChatMessages'
import ChatInput from '@/components/chats/ChatInput'
import { Metadata } from 'next'

interface Params {
  params: {
    userId: string
  }
}

export default function ChatPage({ params }: Params) {
  const userId = Array.isArray(params.userId) ? params.userId[0] : params.userId
  const currentUserId = 'user1' // يمكنك تغييره حسب المستخدم الحالي

  const chat = mockChats.find(c => c.id === userId) || {
    id: userId,
    type: 'user',
    messages: [],
    participants: [userId]
  }

  const chatDetails = chat.type === 'user' 
    ? mockUsers.find(u => u.id === userId) || {
        id: userId,
        name: 'New User'
      }
    : mockGroups.find(g => g.id === userId) || {
        id: userId,
        name: 'New Group',
        members: []
      }

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900 text-white overflow-hidden">
      {/* Chat Header - sticky on mobile */}
      <div className="flex-shrink-0 sticky top-0 z-10 bg-zinc-900/90 backdrop-blur-sm">
        <ChatHeader 
          chatDetails={chatDetails} 
          chatType={chat.type} 
          participantsCount={chat.type === 'group' ? chat.participants.length : undefined}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4">
        <ChatMessages 
          messages={chat.messages} 
          currentUserId={currentUserId}
        />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 pb-4 sm:pb-0 px-2 sm:px-4">
        <ChatInput chatId={chat.id} />
      </div>
    </div>
  )
}

export async function generateMetadata(
  { params }: { params: { userId: string } }
): Promise<Metadata> {
  return {
    title: `Chat ${params.userId}`,
  }
}
