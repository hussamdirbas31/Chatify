// components/landing/DecorativeElements.tsx
export function Decorative() {
  return (
    <>
      {/* Abstract decorative elements */}
      <div className="flex justify-center gap-8 opacity-50">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-xl" />
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-transparent blur-xl" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-pink-500/30 blur-xl" />
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-lg" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-pink-500/30 rounded-br-lg" />
    </>
  );
}