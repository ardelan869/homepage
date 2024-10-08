import Heading from './heading';

export default function H2(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <Heading component={(props) => <h2 {...props} />} {...props} />;
}
