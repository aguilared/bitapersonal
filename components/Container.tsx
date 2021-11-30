type AuxProps = {
  children?: JSX.Element[] | JSX.Element;
};
// function Container({ children }: Props) {
const Container = ({ children }: AuxProps): JSX.Element => (
  <div className="container max-w-2xl m-auto px-4">{children}</div>
);

export default Container;
