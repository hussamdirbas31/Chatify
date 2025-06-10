// components/layout/LandingLayout.tsx
import { ReactNode } from 'react';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className=" h-[100%] bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-900/20 relative">
      {children}
    </div>
  );
}