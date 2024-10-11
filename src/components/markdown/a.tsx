import Link from 'next/link';

export default function A({
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  if (typeof props.href !== 'string') {
    throw new Error('Links require an href prop');
  }

  // @ts-ignore
  return <Link {...props} />;
}
