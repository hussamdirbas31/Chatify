import Link from 'next/link'
import { mockUsers } from '@/lib/mockchat/chat'
import Avatar from '@/components/common/Avatar'
import Button from '@/components/common/Button'

export default function BlockedUsersPage() {
  const blockedUsers = mockUsers.filter(user => user.isBlocked)
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="rounded-lg w-full max-w-md bg-surface/90 backdrop-blur-xl border border-zinc-800">
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-text-primary">Blocked Users</h3>
          <Link href="/dashboard/chats" className="text-muted hover:text-text-primary text-xl">×</Link>
        </div>
        <div className="p-4">
          {blockedUsers.length > 0 ? (
            <div className="space-y-2">
              {blockedUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-surface/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} name={user.name} />
                    <span className="text-text-primary">{user.name}</span>
                  </div>
                  <form action={`/api/unblock-user/${user.id}`} method="POST">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hover:bg-surface/70"
                      type="submit"
                    >
                      Unblock
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary py-4">No blocked users</p>
          )}
        </div>
      </div>
    </div>
  )
}