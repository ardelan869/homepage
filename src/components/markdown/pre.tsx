'use client';

import { cn } from '@/lib/utils';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

export default function Pre({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (!ref.current || copied) return;

    setCopied(true);

    navigator.clipboard.writeText(ref.current.innerText);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }, [ref, copied, setCopied]);

  return (
    <pre ref={ref} className={cn('relative !bg-muted', className)} {...props}>
      <div
        className="absolute right-4 top-3 hover:cursor-pointer"
        onClick={handleClick}
      >
        {copied ? (
          <ClipboardCheck className="h-5 w-5" />
        ) : (
          <Clipboard className="h-5 w-5" />
        )}
      </div>
      {children}
    </pre>
  );
}
