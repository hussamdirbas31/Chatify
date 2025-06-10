'use client'; // Add this directive at the top

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ src, name = '', size = 'md' }: AvatarProps) {
  const [initials, setInitials] = useState('??');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (name) {
      const calculatedInitials = name
        .split(' ')
        .filter(part => part.length > 0)
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
      setInitials(calculatedInitials || '??');
    }
  }, [name]);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  return (
    <div 
      className={`rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold overflow-hidden ${sizeClasses[size]}`}
      aria-label={name || 'User avatar'}
    >
      {src && !hasError ? (
        <Image
          src={src}
          alt={name || 'User avatar'}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
          quality={80}
        />
      ) : (
        initials
      )}
    </div>
  );
}