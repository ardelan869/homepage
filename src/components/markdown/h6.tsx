import Heading from './heading';

export default function H6(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <Heading component={(props) => <h6 {...props} />} {...props} />;
}
