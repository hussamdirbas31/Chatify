'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Post from './Post';
import { Post as PostType } from '@/lib/types/types';

export default function InfiniteFeed({
  initialPosts
}: {
  initialPosts: PostType[];
}) {
  const [visibleCount, setVisibleCount] = useState(Math.min(5, initialPosts.length));
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading || visibleCount >= initialPosts.length) return;
    
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 5, initialPosts.length));
      setLoading(false);
    }, 800);
  }, [initialPosts.length, loading, visibleCount]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 300 && !loading) {
        loadMore();
      }
    };

    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [loadMore, loading]);

  // Debugging: Log the visible posts
  console.log('Visible posts:', initialPosts.slice(0, visibleCount));

  return (
    <div 
      ref={containerRef} 
      className="space-y-6 overflow-y-auto pb-4 scrollbar-thin scrollbar-track-surface scrollbar-thumb-zinc-700"
     
    >
      {initialPosts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No posts available
        </div>
      ) : (
        <>
          {initialPosts.slice(0, visibleCount).map((post) => (
            <Post key={post.id} post={post} />
          ))}
          
          {visibleCount < initialPosts.length && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={loadMore}
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  loading 
                    ? 'bg-surface text-muted'
                    : 'bg-gradient-to-r from-primary/10 to-secondary/10 text-text-primary hover:from-primary/20 hover:to-secondary/20'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  'Load More Posts'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}