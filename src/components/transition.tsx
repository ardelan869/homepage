'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Transition({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [currentChild, setCurrentChild] = useState(children);

  useEffect(() => {
    if (currentChild === children) return;

    const timeout = setTimeout(() => {
      setCurrentChild(children);
    }, 200);

    return () => clearTimeout(timeout);
  }, [children]);

  return (
    <main
      className={cn(
        currentChild !== children ? 'fade-out' : 'fade-in',
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
