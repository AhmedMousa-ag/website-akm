export const HomePage = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={className}>{children}</div>;
};
