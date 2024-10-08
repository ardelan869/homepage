import Heading from './heading';

export default function H5(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <Heading component={(props) => <h5 {...props} />} {...props} />;
}
