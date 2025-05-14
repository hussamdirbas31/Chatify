import ChatSearch from './ChatSearch';
import UserList from './UserList';
import GroupList from './GroupList';

interface User {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline?: boolean;
  isBlocked: boolean;
  unreadCount?: number;
}

interface ChatSidebarProps {
  users: User[];
}

export default function ChatSidebar({ users }: ChatSidebarProps) {
  const filteredUsers = users.filter(user => !user.isBlocked);
  
  return (
    <div className="w-80 border-r border-zinc-800 flex flex-col bg-surface/80 backdrop-blur-xl">
      <ChatSearch />
      
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
        <UserList users={filteredUsers} />
        {/* GroupList is kept but with empty array since groups prop was removed */}
        <GroupList groups={[]} />
      </div>
    </div>
  );
}