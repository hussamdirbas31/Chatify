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
    <div className="max-w-md w-full mx-auto p-8 bg-zinc-900 rounded-xl shadow-sm border border-zinc-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            {title}
          </span>
        </h1>
        <p className="text-zinc-400 mt-2">{subtitle}</p>
      </div>

      {children}

      <div className="mt-6 text-center">
        <p className="text-zinc-500">
          {footerText}{' '}
          <Link
            href={footerHref}
            className="text-primary font-medium hover:underline hover:text-secondary transition-colors"
          >
            {footerLink}
          </Link>
        </p>
      </div>
    </div>
  );
}