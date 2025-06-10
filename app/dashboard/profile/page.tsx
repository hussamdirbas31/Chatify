'use client';
import { useState } from 'react';
import { getCurrentUser, mockPosts } from '@/lib/mockData';
import AvatarSection from '@/components/profile/AvatarSection';
import ProfileForm from '@/components/profile/ProfileForm';
import AddPost from '@/components/posts/AddPost';
import { FeedList } from '@/components/posts/FeedList';

export default function CurrentUserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(getCurrentUser());
  const userPosts = mockPosts.filter(post => post.userId === 'current_user');

  const handleSave = (updatedUser: typeof userData) => {
    setUserData(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 h-full">
      {isEditing ? (
        <ProfileForm user={userData} onSave={handleSave} />
      ) : (
        <>
          <AvatarSection 
            user={userData} 
            onEdit={() => setIsEditing(true)} 
          />
          <AddPost currentUserId="current_user" />
          <div className="space-y-6 h-full">
            <h2 className="text-xl font-semibold text-zinc-100">Your Posts</h2>
            <FeedList posts={userPosts} />
          </div>
        </>
      )}
    </div>
  );
}