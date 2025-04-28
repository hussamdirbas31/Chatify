'use client';
import ProfileSettingSection from '@/components/profile/ProfileSettingSection';
import { getCurrentUser } from '@/lib/mockData';

const SettingsPage: React.FC = () => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background text-text-primary">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-background">
      <div className="bg-surface rounded-xl border border-zinc-800 shadow-sm h-full overflow-hidden">
        <ProfileSettingSection user={currentUser} />
      </div>
    </div>
  );
};

export default SettingsPage;