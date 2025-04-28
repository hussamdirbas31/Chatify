'use client';

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function BackArrow() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-50 text-muted hover:text-primary transition-colors"
    >
      <FaArrowLeft  />
      <span className="sr-only">Back to home</span>
    </Link>
  );
}