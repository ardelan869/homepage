'use client';

// It may come use, only god knows when and why
// It's only role here is to let tailwindcss compile the dark class

import { cn } from '@/lib/utils';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import { MonitorSmartphone, Moon, Sun } from 'lucide-react';

export default function ColorSchemeSwitcher({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setTheme, themes } = useTheme();
  const [theme, setLocalTheme] = useState('system');

  useEffect(() => {
    setLocalTheme(localStorage.getItem('theme') ?? 'system');
  });

  const handleClick = useCallback(() => {
    const index = themes.indexOf(theme),
      nextTheme = themes[(index + 1) % themes.length];

    if (!nextTheme) return;

    setTheme(nextTheme);
    setLocalTheme(nextTheme);
  }, [setTheme, themes, theme]);

  return (
    <button
      className={cn('grid h-5 w-5 place-items-center rounded-none', className)}
      onClick={handleClick}
      {...props}
    >
      <div className="sr-only">Color Scheme Switcher</div>
      {theme === 'light' && <Sun className="h-full w-full object-contain" />}
      {theme === 'dark' && <Moon className="h-full w-full object-contain" />}
      {theme === 'system' && (
        <MonitorSmartphone className="h-full w-full object-contain" />
      )}
    </button>
  );
}
