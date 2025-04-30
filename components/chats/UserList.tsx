import Link from 'next/link'
import Avatar from '@/components/common/Avatar'

interface UserListProps {
  users: any[]
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
          </div>
          <div className="flex-1">
            <p className="font-medium text-text-primary">{user.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}