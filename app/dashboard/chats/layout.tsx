import { ReactNode } from 'react'
import { mockUsers, mockGroups } from '@/lib/mockchat/chat'
import ChatSidebar from '@/components/chats/ChatSidebar'

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-text-primary relative
      before:absolute before:inset-0 before:bg-hero-gradient before:opacity-10 before:-z-10">
      
      <div className="hidden md:flex md:w-80 lg:w-96 h-full">
        <ChatSidebar 
          users={mockUsers}
          groups={mockGroups}
        />
      </div>
      
      <div className="flex-1 flex flex-col w-full max-w-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}