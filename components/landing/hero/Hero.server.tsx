// components/landing/Hero.server.tsx
import { Decorative } from "./Decorative";

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function Hero({ 
  title = "Redefine Your Social Experience",
  subtitle = "Where connections become meaningful",
  description = "A next-generation platform designed for authentic interactions, creative expression, and community building without the noise."
}: HeroProps) {
  return (
    <section className="relative h-full flex items-center bg-zinc-950">
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              {title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-zinc-500 max-w-xl mx-auto mb-10">
            {description}
          </p>

          <Decorative/>
        </div>
      </div>
    </section>
  );
}