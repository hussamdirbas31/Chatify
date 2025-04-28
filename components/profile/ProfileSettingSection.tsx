'use client';
import React from 'react';
import AvatarSection from './AvatarSection';
import UserInfoForm from './UserInfoForm';
import ChangePasswordForm from './ChangePasswordForm';
import type { PublicUser } from '@/lib/types/types';

interface ProfileSettingSectionProps {
  user: PublicUser;
}

const ProfileSettingSection: React.FC<ProfileSettingSectionProps> = ({ user }) => {
  const handleAvatarEdit = () => {
    console.log('Edit avatar clicked');
  };

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-text-secondary">
        Loading user data...
      </div>
    );
  }

  return (
    <section className="h-full bg-background">
      <div className="w-full h-full border border-zinc-800 shadow-lg overflow-hidden bg-surface">
        <div className="grid md:grid-cols-3 h-full">
          {/* الجزء الجانبي للصورة الشخصية */}
          <div className="md:border-r border-zinc-800 p-6 flex flex-col items-center justify-center bg-surface/50">
            <AvatarSection user={user} onEdit={handleAvatarEdit} />
          </div>

          {/* قسم الإعدادات الرئيسي */}
          <div className="md:col-span-2 p-6 sm:p-8 overflow-y-auto scrollbar-thin scrollbar-track-surface/50 scrollbar-thumb-primary/30">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                  إعدادات الملف الشخصي
                </h1>
                <p className="text-sm text-text-secondary">
                  إدارة معلومات حسابك والأمان
                </p>
              </div>

              <div className="space-y-8">
                <UserInfoForm user={user} />
                
                {/* فاصل الأمان */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-surface text-sm text-text-secondary">
                      الأمان
                    </span>
                  </div>
                </div>

                <ChangePasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettingSection;