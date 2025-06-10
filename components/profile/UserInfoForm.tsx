'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { PublicUser } from '@/lib/types/types';

interface UserInfoFormProps {
  user: PublicUser;
}

interface FormData {
  name: string;
  email: string;
  bio: string;
  interests: string;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ user }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio || '',
      interests: user.interests?.join(', ') || ''
    }
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-text-primary mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.name && <p className="mt-1 text-sm text-accent">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.email && <p className="mt-1 text-sm text-accent">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-text-secondary mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              {...register('bio')}
              rows={3}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-text-secondary mb-1">
              Interests (comma separated)
            </label>
            <input
              id="interests"
              type="text"
              {...register('interests')}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default UserInfoForm;