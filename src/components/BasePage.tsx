import MyPic from "../assets/my-picture.png";

export const BasePage = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={className} style={{ backgroundImage: `url(${MyPic}) ` }}>
      {children}
    </div>
  );
};
