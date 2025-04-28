// components/profile/ProfileForm.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import type { PublicUser } from '@/lib/types/types';

interface Props {
  user: PublicUser;
  onSave: (user: PublicUser) => void;
}

export default function ProfileForm({ user, onSave }: Props) {
  const [formData, setFormData] = useState(user);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setAvatarPreview(reader.result as string);
          setFormData(prev => ({ ...prev, avatar: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-24 h-24">
            <Image
              src={avatarPreview}
              alt="Preview"
              fill
              className="rounded-full object-cover border-2 border-purple-500/50"
            />
          </div>
          <label className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full cursor-pointer">
            Change Avatar
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-300">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}