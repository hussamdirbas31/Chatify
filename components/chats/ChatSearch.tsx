export default function ChatSearch() {
    return (
      <form method="GET" action="/dashboard/chats" className="p-4 border-b border-zinc-800">
        <input
          type="text"
          name="search"
          placeholder="Search for users or groups..."
          className="w-full bg-surface/70 border border-zinc-800 rounded-xl px-4 py-2 text-sm 
                    focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-primary 
                    placeholder:text-muted"
        />
      </form>
    )
  }