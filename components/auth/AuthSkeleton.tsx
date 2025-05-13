export default function AuthSkeleton() {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-zinc-900 rounded-xl shadow-sm border border-zinc-800">
      <div className="animate-pulse space-y-6">
        <div className="text-center mb-8 space-y-2">
          <div className="h-8 bg-zinc-700 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-zinc-700 rounded w-1/2 mx-auto"></div>
        </div>

        <div className="space-y-4">
          <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
          <div className="h-10 bg-zinc-700 rounded"></div>
          <div className="h-4 bg-zinc-700 rounded w-1/4"></div>
          <div className="h-10 bg-zinc-700 rounded"></div>
          <div className="h-12 bg-zinc-600 rounded mt-6"></div>
        </div>

        <div className="h-4 bg-zinc-700 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
}