// components/auth/AuthPageLayout.tsx
import { ReactNode } from 'react';
import Image from 'next/image';
import BackArrow from '@/components/common/BackArrow';
import Link from 'next/link';
import image from "@/public/auth.png";

export default function AuthPageLayout({
  children,
  showImage = false,
  title,
  subtitle,
  footerText,
  footerLink,
  footerHref,
  imagePosition = 'left',
}: {
  children: ReactNode;
  showImage?: boolean;
  title: string;
  subtitle: string;
  footerText: string;
  footerLink: string;
  footerHref: string;
  imagePosition?: 'left' | 'right';
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <BackArrow />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Image Section */}
        {showImage && (
          <div className={`
            hidden md:flex relative flex-1 
            ${imagePosition === 'left' ? 'order-first' : 'order-last'}
            min-h-[50vh] md:min-h-screen
          `}>
            <Image
              src={image}
              alt="Technology Background"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/60 flex items-end p-6 lg:p-12">
              <div className="text-white space-y-2">
                <h2 className="text-xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Chatify
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-12 
                        overflow-y-auto">
          <div className="w-full max-w-md lg:max-w-lg space-y-6">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
                {title}
              </h1>
              <p className="mt-2 text-zinc-400 text-sm md:text-base">
                {subtitle}
              </p>
            </div>
            
            {children}

            <div className="mt-4 text-center text-sm text-zinc-500">
              {footerText}{' '}
              <Link
                href={footerHref}
                className="font-semibold text-indigo-400 hover:text-indigo-300 
                           transition-colors duration-200"
              >
                {footerLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}