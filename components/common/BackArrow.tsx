'use client';

import Link from 'next/link';
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BackArrow() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-50 text-muted hover:text-primary transition-colors"
    >
<FaArrowLeftLong />
      <span className="sr-only">Back to home</span>
    </Link>
  );
}