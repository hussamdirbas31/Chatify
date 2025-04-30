import Button from '@/components/common/Button'
import Link from 'next/link'

export default function ChatSettingsPage() {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="rounded-lg w-full max-w-md bg-surface/90 backdrop-blur-xl border border-zinc-800">
        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
          <h3 className="text-lg font-semibold text-text-primary">Chat Settings</h3>
          <Link href="/dashboard/chats" className="text-muted hover:text-text-primary text-xl">×</Link>
        </div>
        <form className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">Theme</label>
            <select 
              name="theme"
              className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-text-primary"
            >
              <option>Dark</option>
              <option>Light</option>
              <option>System</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">Notifications</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="notifications" name="notifications" className="accent-primary" />
              <label htmlFor="notifications" className="text-sm text-text-secondary">Enable notifications</label>
            </div>
          </div>
          <Button 
            type="submit"
            className="w-full mt-4 bg-hero-gradient hover:opacity-90 transition-all"
          >
            Save Settings
          </Button>
        </form>
      </div>
    </div>
  )
}