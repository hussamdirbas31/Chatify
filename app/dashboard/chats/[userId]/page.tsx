'use client'
import { mockUsers, mockGroups, mockChats } from '@/lib/mockchat/chat'
import Avatar from '@/components/common/Avatar'
import Button from '@/components/common/Button'

export default function ChatPage({ params }: { params: { userId: string } }) {
  const chat = mockChats.find(c => c.id === params.userId) || {
    id: params.userId,
    type: 'user',
    messages: [],
    participants: [params.userId]
  }

  const chatDetails = chat.type === 'user' 
    ? mockUsers.find(u => u.id === params.userId) || {
        id: params.userId,
        name: 'مستخدم جديد',
        status: 'offline'
      }
    : mockGroups.find(g => g.id === params.userId) || {
        id: params.userId,
        name: 'مجموعة جديدة',
        participants: []
      }

  return (
    <div className="flex flex-col h-full bg-surface/50">
      {/* رأس المحادثة */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-surface/80">
        <div className="flex items-center gap-3">
          <Avatar 
            src={'avatar' in chatDetails ? (chatDetails as any).avatar : undefined} 
            name={chatDetails.name} 
          />
          <div>
            <h2 className="font-semibold text-text-primary">{chatDetails.name}</h2>
            <p className="text-xs text-text-secondary">
              {chat.type === 'user' ? 
                ('status' in chatDetails && (chatDetails as any).status === 'online' ? 'متصل الآن' : 'غير متصل') : 
                `${chat.participants.length} أعضاء`}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="nav" 
            size="sm" 
            className="hover:bg-surface/50 hover:border-primary/20"
            aria-label="مكالمة فيديو"
          >
            📹
          </Button>
          <Button 
            variant="nav" 
            size="sm" 
            className="hover:bg-surface/50 hover:border-secondary/20"
            aria-label="مكالمة صوتية"
          >
            📞
          </Button>
          <Button 
            variant="nav" 
            size="sm" 
            className="hover:bg-surface/50 hover:border-accent/20"
            aria-label="إعدادات الدردشة"
          >
            ⚙️
          </Button>
        </div>
      </div>
      
      {/* منطقة الرسائل */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-surface/20 to-surface/10 scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
        {chat.messages.length > 0 ? (
          chat.messages.map(message => {
            const sender = mockUsers.find(u => u.id === message.senderId)
            return (
              <div 
                key={message.id} 
                className={`flex ${message.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-xl p-3 ${
                    message.senderId === 'user1' 
                      ? 'bg-primary/80 rounded-br-none' 
                      : 'bg-surface/70 rounded-bl-none'
                  }`}
                >
                  {sender && message.senderId !== 'user1' && (
                    <p className="text-xs font-medium text-secondary mb-1">{sender.name}</p>
                  )}
                  <p className="text-sm text-text-primary">{message.content}</p>
                  <p className="text-xs text-text-secondary mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )
          })
        ) : (
          <div className="h-full flex items-center justify-center text-text-secondary">
            <p>لا توجد رسائل بعد. ابدأ المحادثة الآن!</p>
          </div>
        )}
      </div>
      
      {/* إدخال الرسالة */}
      <div className="p-4 border-t border-zinc-800 bg-surface/80">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="اكتب رسالة..."
            className="flex-1 bg-surface/70 border border-zinc-800 rounded-xl px-4 py-2 text-sm 
                      focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary 
                      placeholder:text-muted"
          />
          <Button className="bg-hero-gradient hover:opacity-90 transition-all">إرسال</Button>
        </div>
      </div>
    </div>
  )
}