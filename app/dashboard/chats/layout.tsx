'use client'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { mockUsers, mockGroups } from '@/lib/mockchat/chat'
import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import Portal from '@/components/common/Portal'
import Avatar from '@/components/common/Avatar'

export default function ChatLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [isBlockedUsersOpen, setIsBlockedUsersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const blockedUsers = mockUsers.filter(user => user.isBlocked)
  
  const filteredUsers = mockUsers.filter(user => 
    !user.isBlocked && 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const filteredGroups = mockGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleNavigation = (id: string) => {
    router.push(`/dashboard/chats/${id}`)
  }

  return (
    <div className="flex h-screen bg-background text-text-primary relative
      before:absolute before:inset-0 before:bg-hero-gradient before:opacity-10 before:-z-10">
      
      {/* الشريط الجانبي للدردشات */}
      <div className="w-80 border-r border-zinc-800 flex flex-col bg-surface/80 backdrop-blur-xl">
        {/* رأس الشريط الجانبي */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-primary">الدردشات</h2>
          <div className="flex gap-2">
            <Button 
              variant="nav" 
              size="sm" 
              onClick={() => setIsSettingsOpen(true)}
              className="hover:bg-surface/50 hover:border-accent/20"
              aria-label="الإعدادات"
            >
              ⚙️
            </Button>
            <Button 
              variant="nav" 
              size="sm" 
              onClick={() => setIsCreateGroupOpen(true)}
              className="hover:bg-surface/50 hover:border-secondary/20"
              aria-label="إنشاء مجموعة"
            >
              👥
            </Button>
            <Button 
              variant="nav" 
              size="sm" 
              onClick={() => setIsBlockedUsersOpen(true)}
              className="hover:bg-surface/50 hover:border-primary/20"
              aria-label="المستخدمون المحظورون"
            >
              🚫
            </Button>
          </div>
        </div>
        
        {/* شريط البحث */}
        <div className="p-4 border-b border-zinc-800">
          <input
            type="text"
            placeholder="ابحث عن مستخدمين أو مجموعات..."
            className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-4 py-2 text-sm 
                      focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary 
                      placeholder:text-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* قوائم المستخدمين والمجموعات */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
          {/* قسم المستخدمين */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-text-secondary px-2 py-1">المستخدمون</h3>
            {filteredUsers.map(user => (
              <Link
                key={user.id}
                href={`/dashboard/chats/${user.id}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface/50 
                          transition-all border border-transparent hover:border-primary/20"
              >
                <div className="relative">
                  <Avatar src={user.avatar} name={user.name} />
                  <span 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface ${
                      user.status === 'online' ? 'bg-green-500' : 
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{user.name}</p>
                  <p className="text-xs text-text-secondary">
                    {user.status === 'online' ? 'متصل الآن' : 
                     user.status === 'away' ? 'غير متاح' : 
                     `آخر ظهور ${new Date(user.lastSeen || '').toLocaleTimeString()}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* قسم المجموعات */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-text-secondary px-2 py-1">المجموعات</h3>
            {filteredGroups.map(group => (
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
                    {group.members.length} أعضاء
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* منطقة المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      
      {/* النوافذ المنبثقة */}
      <Portal>
        {/* نافذة إعدادات الدردشة */}
        <Modal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)}
          title="إعدادات الدردشة"
          className="bg-surface/90 backdrop-blur-xl border border-zinc-800"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">السمة</label>
              <select className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-text-primary">
                <option>داكن</option>
                <option>فاتح</option>
                <option>النظام</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">الإشعارات</label>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifications" className="accent-primary" />
                <label htmlFor="notifications" className="text-sm text-text-secondary">تفعيل الإشعارات</label>
              </div>
            </div>
            <Button className="w-full mt-4 bg-hero-gradient hover:opacity-90 transition-all">حفظ الإعدادات</Button>
          </div>
        </Modal>
        
        {/* نافذة إنشاء مجموعة */}
        <Modal 
          isOpen={isCreateGroupOpen} 
          onClose={() => setIsCreateGroupOpen(false)}
          title="إنشاء مجموعة جديدة"
          className="bg-surface/90 backdrop-blur-xl border border-zinc-800 max-w-lg"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">اسم المجموعة</label>
              <input 
                type="text" 
                className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-text-primary"
                placeholder="أدخل اسم المجموعة"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">إضافة أعضاء</label>
              <input 
                type="text" 
                className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-text-primary mb-2"
                placeholder="ابحث عن مستخدمين للإضافة"
              />
              <div className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
                {mockUsers.filter(u => !u.isBlocked).map(user => (
                  <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-surface/50 rounded-xl">
                    <input type="checkbox" id={`user-${user.id}`} className="accent-primary" />
                    <Avatar src={user.avatar} name={user.name} />
                    <label htmlFor={`user-${user.id}`} className="flex-1 cursor-pointer text-text-primary">
                      {user.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full mt-4 bg-hero-gradient hover:opacity-90 transition-all">إنشاء المجموعة</Button>
          </div>
        </Modal>
        
        {/* نافذة المستخدمين المحظورين */}
        <Modal 
          isOpen={isBlockedUsersOpen} 
          onClose={() => setIsBlockedUsersOpen(false)}
          title="المستخدمون المحظورون"
          className="bg-surface/90 backdrop-blur-xl border border-zinc-800"
        >
          {blockedUsers.length > 0 ? (
            <div className="space-y-2">
              {blockedUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 hover:bg-surface/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} name={user.name} />
                    <span className="text-text-primary">{user.name}</span>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-surface/70">إلغاء الحظر</Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-text-secondary py-4">لا يوجد مستخدمون محظورون</p>
          )}
        </Modal>
      </Portal>
    </div>
  )
}