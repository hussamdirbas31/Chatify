import Link from 'next/link'
import Avatar from '@/components/common/Avatar'

interface GroupListProps {
  groups: any[]
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
          <Avatar name={group.name} />
          <div className="flex-1">
            <p className="font-medium text-text-primary">{group.name}</p>
            <p className="text-xs text-text-secondary">
              {group.members.length} members
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}