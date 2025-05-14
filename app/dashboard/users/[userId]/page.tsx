import { notFound } from 'next/navigation';
import { mockUsers, mockPosts, getCurrentUser } from '@/lib/mockData';
import ProfileHeader from '@/components/profile/AvatarSection';
import FriendButton from '@/components/friends/FriendButton';
import { FeedList } from '@/components/posts/FeedList';

interface UserProfilePageProps {
  params: { userId: string };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const currentUser = getCurrentUser();
  const user = mockUsers.find(u => u.id === params.userId);
  
  if (!user || user.id === currentUser.id) {
    notFound();
  }

  const userPosts = mockPosts.filter(
    post => post.userId === user.id && (post.isPublic || post.userId === currentUser.id)
  );

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 space-y-8 h-full">
      <ProfileHeader user={user} />
      
      <div className="flex justify-end">
        <FriendButton 
        />
      </div>

      <div className="space-y-6 h-full">
        <h2 className="text-xl font-semibold text-text-primary">
          {user.name}&apos;s Posts
        </h2>
        {userPosts.length > 0 ? (
          <FeedList posts={userPosts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-text-secondary">
              {user.name} hasn&apos;t posted anything visible to you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}