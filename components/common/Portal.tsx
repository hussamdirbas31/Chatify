// components/common/Portal.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.body)
    : null;
}