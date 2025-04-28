'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ChangePasswordFormData>();

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log('Password change submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-text-primary mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-text-secondary mb-1">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              {...register('currentPassword', { required: 'Current password is required' })}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.currentPassword && <p className="mt-1 text-sm text-accent">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-text-secondary mb-1">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.newPassword && <p className="mt-1 text-sm text-accent">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                validate: (value) => 
                  value === watch('newPassword') || 'Passwords do not match'
              })}
              className="w-full px-4 py-2 bg-surface border border-zinc-800 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-accent">{errors.confirmPassword.message}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
        >
          Change Password
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;