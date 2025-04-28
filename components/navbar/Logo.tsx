import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative group text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 transition-colors duration-300"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <span className="bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg w-6 h-6 flex items-center justify-center text-zinc-100 text-lg font-bold shadow-sm">C</span>
        <span>Chatify</span>
      </span>
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-400/70 to-pink-400/70 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  );
}