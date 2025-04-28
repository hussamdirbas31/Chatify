"use client";

import { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthForm({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerHref,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerHref: string;
}) {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {title}
        </h1>
        <p className="text-gray-500 mt-2">{subtitle}</p>
      </div>

      {children}

      <div className="mt-6 text-center">
        <p className="text-gray-500">
          {footerText}{' '}
          <Link
            href={footerHref}
            className="text-indigo-600 font-medium hover:underline hover:text-indigo-500 transition-colors"
          >
            {footerLink}
          </Link>
        </p>
      </div>
    </div>
  );
}