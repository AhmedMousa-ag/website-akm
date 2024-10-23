import MyPic from "../assets/my-picture.png";

export const BasePage = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className}>
      {children}
      <div
        className={className + " opacity-30"}
        style={{ backgroundImage: `url(${MyPic}) ` }}
      ></div>
    </div>
  );
};
