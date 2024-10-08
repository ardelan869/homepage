import Heading from './heading';

export default function H4(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <Heading component={(props) => <h4 {...props} />} {...props} />;
}
