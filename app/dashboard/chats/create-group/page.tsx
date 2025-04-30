import Button from '@/components/common/Button'
import Link from 'next/link'
import { mockUsers } from '@/lib/mockchat/chat'
import Avatar from '@/components/common/Avatar'

export default function CreateGroupPage() {
  const availableUsers = mockUsers.filter(u => !u.isBlocked)
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="rounded-lg w-full max-w-lg bg-surface/90 backdrop-blur-xl border border-zinc-800">
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-text-primary">Create New Group</h3>
          <Link href="/dashboard/chats" className="text-muted hover:text-text-primary text-xl">×</Link>
        </div>
        <form className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">Group Name</label>
            <input 
              type="text"
              name="groupName"
              className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-text-primary"
              placeholder="Enter group name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">Add Members</label>
            <input 
              type="text"
              name="searchMembers"
              className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-text-primary mb-2"
              placeholder="Search users to add"
            />
            <div className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
              {availableUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-surface/50 rounded-xl">
                  <input 
                    type="checkbox" 
                    id={`user-${user.id}`} 
                    name={`member-${user.id}`}
                    className="accent-primary" 
                  />
                  <Avatar src={user.avatar} name={user.name} />
                  <label htmlFor={`user-${user.id}`} className="flex-1 cursor-pointer text-text-primary">
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full mt-4 bg-hero-gradient hover:opacity-90 transition-all">
            Create Group
          </Button>
        </form>
      </div>
    </div>
  )
}