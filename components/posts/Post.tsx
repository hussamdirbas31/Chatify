'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { FaRegHeart, FaHeart, FaRegComment} from 'react-icons/fa';
import { FiShare2, FiBookmark, FiMoreHorizontal, FiLock } from 'react-icons/fi';
import { Post as PostType } from '@/lib/types/types';
import { mockUsers } from '@/lib/mockData';
import CommentsModal from './CommentModal';

export default function Post({ post }: { post: PostType }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [saved, setSaved] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const author = mockUsers.find(u => u.id === post.userId)!;

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <>
      <div className="bg-surface rounded-xl border border-zinc-800 overflow-hidden shadow-lg hover:shadow-secondary/10 transition-all hover:translate-y-[-2px]">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src={'/public/auth.png'}
                  alt={author.name}
                  fill
                  className="rounded-full object-cover border-2 border-transparent hover:border-secondary transition-all"
                />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{author.name}</h3>
                <span className="text-xs text-muted">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  {!post.isPublic && (
                    <span className="ml-2 text-secondary">
                      <FiLock size={10} />
                      Private
                    </span>
                  )}
                </span>
              </div>
            </div>
            <button className="text-muted hover:text-text-primary p-1 rounded-full">
              <FiMoreHorizontal size={18} />
            </button>
          </div>

          <div className="mt-3 space-y-4">
            <p className="text-text-secondary whitespace-pre-line">{post.content}</p>
            
            {post.images?.[0] && (
              <div className="relative w-full h-80 rounded-lg overflow-hidden border border-zinc-800 group">
                <Image
                  src={post.images[0].url}
                  alt={post.images[0].alt || ''}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-3 border-t border-zinc-800 bg-surface/50">
          <div className="flex justify-between text-muted">
            <button 
              onClick={toggleLike}
              className={`flex items-center space-x-1.5 transition-all ${
                liked ? 'text-accent' : 'hover:text-accent'
              }`}
            >
              {liked ? (
                <FaHeart  />
              ) : (
                <FaRegHeart />
              )}
              <span>{likes}</span>
            </button>
            
            <button 
              onClick={() => setShowCommentsModal(true)}
              className="flex items-center space-x-1.5 hover:text-primary transition-colors"
            >
              <FaRegComment />
              <span>{post.comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-1.5 hover:text-secondary transition-colors">
              <FiShare2 />
              <span>Share</span>
            </button>
            
            <button 
              onClick={() => setSaved(!saved)}
              className={`flex items-center space-x-1.5 transition-colors ${
                saved ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <FiBookmark  />
            </button>
          </div>
        </div>
      </div>

      {showCommentsModal && (
        <CommentsModal
          onClose={() => setShowCommentsModal(false)}
          postId={post.id}
          userId={author.name}
          content={post.content}
          timestamp={new Date(post.createdAt).getTime()}
          images={post.images?.map(img => img.url) || []}
        />
      )}
    </>
  );
}