import Avatar from '@/components/common/Avatar'
import Button from '@/components/common/Button'
import { User, Group } from '@/lib/mockchat/chat'

interface ChatHeaderProps {
  chatDetails: User | Group
  chatType: 'user' | 'group'
  participantsCount?: number
}

export default function ChatHeader({ 
  chatDetails, 
  chatType,
  participantsCount
}: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
      <div className="flex items-center gap-3">
        <Avatar 
          src={'avatar' in chatDetails ? chatDetails.avatar : undefined} 
          name={chatDetails.name} 
        />
        <div>
          <h2 className="font-semibold text-white">{chatDetails.name}</h2>
          {chatType === 'group' && participantsCount && (
            <p className="text-xs text-zinc-400">
              {participantsCount} members
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="nav" 
          size="sm" 
          className="hover:bg-zinc-800/50 hover:border-indigo-500/20"
          aria-label="Video call"
          asLink
          href={`/call/video/${chatDetails.id}`}
        >
          📹
        </Button>
        <Button 
          variant="nav" 
          size="sm" 
          className="hover:bg-zinc-800/50 hover:border-pink-500/20"
          aria-label="Voice call"
          asLink
          href={`/call/audio/${chatDetails.id}`}
        >
          📞
        </Button>
        <Button 
          variant="nav" 
          size="sm" 
          className="hover:bg-zinc-800/50 hover:border-emerald-500/20"
          aria-label="Chat settings"
          asLink
          href={`/chat/settings/${chatDetails.id}`}
        >
          ⚙️
        </Button>
      </div>
    </div>
  )
}