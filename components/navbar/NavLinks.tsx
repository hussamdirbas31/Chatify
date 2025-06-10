"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/home", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/messages", label: "Messages" },
  { href: "/profile", label: "Profile" },
];

interface NavLinksProps {
  onLinkClick?: () => void;
}

export default function NavLinks({ onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={clsx(
            "text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200",
            pathname === link.href
              ? "text-zinc-100 bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold shadow-sm"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}