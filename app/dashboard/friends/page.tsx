import SearchUsers from '@/components/friends/SearchUsers';
import SuggestedFriends from '@/components/friends/SuggestedFriends';
import CurrentFriends from '@/components/friends/CurrentFriends';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function FriendsPage() {
  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-8 h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Friends</h1>
        <Link href="/dashboard/friends/requests">
          <Button variant="secondary" size="sm">
            View Requests
          </Button>
        </Link>
      </div>
      
      <div className="space-y-6 h-full">
        <SearchUsers />
        <CurrentFriends />
        <SuggestedFriends />
      </div>
    </div>
  );
}