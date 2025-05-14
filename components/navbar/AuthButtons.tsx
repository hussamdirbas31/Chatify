"use client";

import Link from "next/link";

export default function AuthButtons() {

  return (
    <div className="flex gap-3">
      <Link
        href="/auth/login"
        className="text-sm font-medium px-4 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-all duration-200"
      >
        Login
      </Link>
      <Link
        href="/auth/register"
        className="text-sm font-medium px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-zinc-100 hover:from-indigo-400 hover:to-purple-400 transition-all duration-200 shadow-md"
      >
        Register
      </Link>
    </div>
  );
}