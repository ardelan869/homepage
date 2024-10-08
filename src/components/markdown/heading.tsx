import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Heading({
  children,
  component: Component,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  component: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => JSX.Element;
}) {
  return (
    <Link href={`#${props.id}`} className="!no-underline">
      <Component
        className={cn(
          'group flex items-center font-semibold hover:cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
        <small className="ml-2 hidden text-muted group-hover:block">#</small>
      </Component>
    </Link>
  );
}
