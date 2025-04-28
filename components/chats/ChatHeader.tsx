// components/chat/ChatHeader.tsx
import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';

interface ChatHeaderProps {
  name: string;
  avatar?: string;
  status?: string;
  membersCount?: number;
  type: 'user' | 'group';
}

export default function ChatHeader({ name, avatar, status, membersCount, type }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar src={avatar} name={name} />
        <div>
          <h2 className="font-semibold">{name}</h2>
          <p className="text-xs text-zinc-400">
            {type === 'user' ? 
              (status === 'online' ? 'Online' : 'Offline') : 
              `${membersCount} members`}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="nav" size="sm" aria-label="Video call">
          📹
        </Button>
        <Button variant="nav" size="sm" aria-label="Voice call">
          📞
        </Button>
        <Button variant="nav" size="sm" aria-label="Chat settings">
          ⚙️
        </Button>
      </div>
    </div>
  );
}