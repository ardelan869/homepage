'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { MonitorSmartphone, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ColorSchemeSwitcher({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setTheme } = useTheme();
  const [theme, setLocalTheme] = useState('system');

  const [open, setOpen] = useState(false);

  const setScheme = (scheme: string) => {
    setTheme(scheme);
    setOpen(false);
  };

  useEffect(() => {
    setLocalTheme((localStorage.getItem('theme')) ?? 'system');
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn('h-9 w-9 p-2', className)}
          onClick={() => setOpen((b) => !b)}
          {...props}
        >
          <div className="sr-only">Color Scheme Switcher</div>
          {/* {colorScheme === 'light' && <Sun />}
					{colorScheme === 'dark' && <Moon />}
					{colorScheme === 'system' && <MonitorSmartphone />} */}
          {theme === 'light' && <Sun />}
          {theme === 'dark' && <Moon />}
          {theme === 'system' && <MonitorSmartphone />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-28 p-1">
        {['light', 'dark', 'system'].map((scheme) => (
          <Button
            key={scheme}
            variant="ghost"
            size="sm"
            className="w-full text-center"
            onClick={() => setScheme(scheme)}
          >
            {scheme[0]!.toUpperCase() + scheme.slice(1)}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
