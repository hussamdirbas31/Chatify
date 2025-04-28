'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { mockPosts } from '@/lib/mockData';
import { Post } from '@/lib/types/types';
import { FiImage, FiGlobe, FiLock } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

export default function AddPost({ currentUserId }: { currentUserId: string }) {
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    const newPost: Post = {
      id: `post_${Date.now()}`,
      userId: currentUserId,
      content,
      createdAt: new Date().toISOString(),
      isPublic,
      likes: [],
      comments: [],
    };
    
    mockPosts.unshift(newPost);
    setContent('');
    setImage(null);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-surface rounded-xl border border-zinc-800 space-y-4 backdrop-blur-sm shadow-lg shadow-secondary/10">
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-text-primary">
          {currentUserId.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 space-y-3">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Share your creativity..."
            className="w-full p-3 bg-surface/50 border-b border-zinc-800 text-text-primary focus:outline-none focus:border-secondary transition-all placeholder:text-muted resize-none"
            rows={3}
          />
          
          {image && (
            <div className="relative group rounded-xl overflow-hidden border-2 border-zinc-800">
              <Image 
                src={image} 
                alt="preview" 
                width={600}
                height={400}
                className="object-cover w-full max-h-80"
              />
              <button 
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-surface/80 rounded-full p-1.5 text-text-secondary hover:text-text-primary transition-colors"
              >
                <IoMdClose size={18} />
              </button>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={handleImageUpload}
                className="text-muted hover:text-primary transition-colors p-1.5 rounded-full hover:bg-surface/50"
              >
                <FiImage size={20} />
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="hidden" 
                />
              </button>
              
              <button 
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className="flex items-center space-x-1 text-xs text-muted hover:text-secondary transition-colors px-2 py-1.5 rounded-full hover:bg-surface/50"
              >
                {isPublic ? <FiGlobe size={16} /> : <FiLock size={16} />}
                <span>{isPublic ? 'Public' : 'Private'}</span>
              </button>
            </div>
            
            <button 
              type="submit" 
              disabled={!content.trim()}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                content.trim() 
                  ? 'bg-hero-gradient text-text-primary shadow-lg shadow-primary/20 hover:shadow-primary/40'
                  : 'bg-surface text-muted cursor-not-allowed'
              }`}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}