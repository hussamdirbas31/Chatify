import Link from 'next/link'
import Avatar from '@/components/common/Avatar'

interface GroupMember {
  id: string
  name: string
  avatar?: string
}

interface Group {
  id: string
  name: string
  members: GroupMember[]
  avatar?: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
}

interface GroupListProps {
  groups: Group[]
}

export default function GroupList({ groups }: GroupListProps) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-text-secondary px-2 py-1">Groups</h3>
      {groups.map(group => (
        <Link
          key={group.id}
          href={`/dashboard/chats/${group.id}`}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/50 
                    transition-all border border-transparent hover:border-secondary/20"
        >
          <Avatar name={group.name} src={group.avatar} />
          <div className="flex-1">
            <p className="font-medium text-text-primary">{group.name}</p>
            <p className="text-xs text-text-secondary">
              {group.members.length} member{group.members.length !== 1 ? 's' : ''}
            </p>
          </div>
          {group.unreadCount && group.unreadCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {group.unreadCount}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}