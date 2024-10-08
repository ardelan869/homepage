import Heading from './heading';

export default function H3(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <Heading component={(props) => <h3 {...props} />} {...props} />;
}
