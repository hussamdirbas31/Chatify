import ChatSearch from './ChatSearch'
import UserList from './UserList'
import GroupList from './GroupList'

interface ChatSidebarProps {
  users: any[]
  groups: any[]
}

export default function ChatSidebar({ users, groups }: ChatSidebarProps) {
  const filteredUsers = users.filter(user => !user.isBlocked)
  
  return (
    <div className="w-80 border-r border-zinc-800 flex flex-col bg-surface/80 backdrop-blur-xl">
      
      <ChatSearch />
      
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
        <UserList users={filteredUsers} />
        <GroupList groups={groups} />
      </div>
    </div>
  )
}