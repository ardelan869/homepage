import { cn } from '@/lib/utils';

export default function Skeleton({
  align = 'left',
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { align?: 'left' | 'right' }) {
  return (
    <div
      className={cn(
        'flex flex-1 animate-pulse items-center gap-4',
        align === 'right' && 'flex-row-reverse',
        className
      )}
      {...props}
    >
      <div className="h-16 w-16 bg-muted" />
      <div
        className={cn('flex flex-col gap-2', align === 'right' && 'items-end')}
      >
        <div className="h-7 w-60 bg-muted" />
        <div className="h-5 w-32 bg-muted" />
      </div>
    </div>
  );
}
