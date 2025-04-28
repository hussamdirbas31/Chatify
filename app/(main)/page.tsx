// app/page.tsx
import LandingLayout from '@/components/layout/LandingLayout';
import Hero from '@/components/landing/hero/Hero.server';
import '@/app/globals.css'
export default function HomePage() {
  return (
    <LandingLayout>
      <Hero />
    </LandingLayout>
  );
}