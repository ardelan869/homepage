import Heading from './heading';

export default function H1(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <Heading component={(props) => <h1 {...props} />} {...props} />;
}
