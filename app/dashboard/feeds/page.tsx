import AddPost from '@/components/posts/AddPost';
import InfiniteFeed from '@/components/posts/InfiniteFeed';
import { mockPosts, mockUsers } from '@/lib/mockData';
import { Post } from '@/lib/types/types';

export default function FeedPage() {
  const currentUserId = '1';
  const me = mockUsers.find(u => u.id === currentUserId)!;

  const visiblePosts: Post[] = mockPosts.filter(post =>
    post.isPublic ||
    post.userId === currentUserId ||
    me.following.includes(post.userId)
  );

  return (
    <div className="max-w-2xl w-full mx-auto p-12 space-y-6 h-full">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-zinc-950/80 py-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400">
          Chatify
        </h1>
      </div>
      <AddPost currentUserId={currentUserId} />
      <InfiniteFeed initialPosts={visiblePosts} />
    </div>
  );
}