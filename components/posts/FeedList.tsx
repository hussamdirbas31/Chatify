import Post from './Post';
import type { Post as PostType } from '@/lib/types/types';

export function FeedList({ posts }: { posts: PostType[] }) {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}