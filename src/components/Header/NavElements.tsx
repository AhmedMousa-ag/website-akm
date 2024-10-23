export const NavElementRight = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  let cssClass = "space-x-6 mr-6 ";
  cssClass = className ? cssClass + className : cssClass;
  return <div className={cssClass}>{children}</div>;
};
