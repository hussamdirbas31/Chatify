import Link from 'next/link'
import Avatar from '@/components/common/Avatar'

interface User {
  id: string
  name: string
  avatar?: string
  isOnline?: boolean
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
}

interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-text-secondary px-2 py-1">Users</h3>
      {users.map(user => (
        <Link
          key={user.id}
          href={`/dashboard/chats/${user.id}`}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/50 
                    transition-all border border-transparent hover:border-primary/20"
        >
          <div className="relative">
            <Avatar src={user.avatar} name={user.name} />
            {user.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface"></span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <p className="font-medium text-text-primary truncate">{user.name}</p>
              {user.unreadCount && user.unreadCount > 0 && (
                <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {user.unreadCount}
                </span>
              )}
            </div>
            {user.lastMessage && (
              <p className="text-xs text-text-secondary truncate">{user.lastMessage}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}