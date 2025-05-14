'use client';
import { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { FiSend, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import Portal from '@/components/common/Portal';

interface Comment { 
  id: string; 
  userId: string; 
  avatar: string;
  text: string; 
  timestamp: number;
  likes: number;
}

export default function CommentsModal({
  onClose, 
  userId, 
  content, 
  timestamp, 
  images = []
}: {
  onClose: () => void;
  postId: string; 
  userId: string; 
  content: string; 
  timestamp: number; 
  images?: string[];
}) {
  const [comments, setComments] = useState<Comment[]>([
    { 
      id: 'c1', 
      userId: 'Alice', 
      avatar: '/avatars/alice.jpg',
      text: 'This is amazing! Love the colors and composition 👏', 
      timestamp: Date.now() - 120000,
      likes: 12
    },
    { 
      id: 'c2', 
      userId: 'Bob', 
      avatar: '/avatars/bob.jpg',
      text: 'Where was this taken? The scenery is breathtaking!', 
      timestamp: Date.now() - 60000,
      likes: 5
    },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<string[]>([]);

  const addComment = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment_${Date.now()}`,
      userId: 'You',
      avatar: '',
      text: newComment,
      timestamp: Date.now(),
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const toggleLike = (commentId: string) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId));
      setComments(comments.map(c => 
        c.id === commentId ? {...c, likes: c.likes - 1} : c
      ));
    } else {
      setLikedComments([...likedComments, commentId]);
      setComments(comments.map(c => 
        c.id === commentId ? {...c, likes: c.likes + 1} : c
      ));
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-[1000] bg-zinc-950/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-purple-900/10">
          {/* Header */}
          <div className="sticky top-0 z-10 p-4 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-400">
              Conversation
            </h2>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Original Post */}
          <div className="p-4 border-b border-zinc-800 bg-gradient-to-b from-zinc-900/70 to-zinc-900/40">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white">
                {userId.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-zinc-100">{userId}</span>
                  <span className="text-xs text-zinc-500">
                    {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="mt-1 text-zinc-300">{content}</p>
              </div>
            </div>
            
            {images[0] && (
              <div className="mt-3 relative w-full h-64 rounded-xl overflow-hidden border-2 border-zinc-800/50">
                <Image 
                  src={images[0]} 
                  alt="" 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700">
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                <FiMessageSquare size={48}  />
                <h3 className="text-lg font-medium text-zinc-300">No comments yet</h3>
                <p className="text-zinc-500 mt-1">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-4 p-4">
                {comments.map(comment => (
                  <div key={comment.id} className="group flex space-x-3">
                    <div className="flex-shrink-0 h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white">
                      {comment.userId.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline space-x-2">
                        <h4 className="text-sm font-medium text-zinc-100">{comment.userId}</h4>
                        <span className="text-xs text-zinc-500">
                          {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-300">{comment.text}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <button 
                          onClick={() => toggleLike(comment.id)}
                          className={`flex items-center space-x-1 text-xs ${
                            likedComments.includes(comment.id) 
                              ? 'text-pink-500' 
                              : 'text-zinc-500 hover:text-pink-400'
                          }`}
                        >
                          <FiHeart size={14} />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-xs text-zinc-500 hover:text-indigo-400">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Input */}
          <form 
            onSubmit={addComment}
            className="sticky bottom-0 p-4 bg-zinc-900/90 backdrop-blur-sm border-t border-zinc-800"
          >
            <div className="flex items-center space-x-2">
              <input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-100 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         placeholder:text-zinc-500 text-sm"
              />
              <button 
                type="submit" 
                disabled={!newComment.trim()}
                className={`p-2.5 rounded-full transition-all ${
                  newComment.trim()
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}