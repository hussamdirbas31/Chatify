import Button from '@/components/common/Button'

interface ChatInputProps {
  chatId: string
}

export default function ChatInput({ chatId }: ChatInputProps) {
  return (
    <form 
      action="/api/send-message" 
      method="POST"
      className="p-4 border-t border-zinc-800 bg-zinc-900/80"
    >
      <input type="hidden" name="chatId" value={chatId} />
      <div className="flex gap-2">
        <input
          type="text"
          name="message"
          placeholder="Type a message..."
          className="flex-1 bg-zinc-800/70 border border-zinc-700 rounded-xl px-4 py-2 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-white 
                    placeholder:text-zinc-400"
          required
        />
        <Button 
          type="submit"
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
        >
          Send
        </Button>
      </div>
    </form>
  )
}