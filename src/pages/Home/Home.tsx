import MyPic from "../../assets/my-picture.png";

export const HomePage = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={className} style={{ backgroundImage: `url(${MyPic}) ` }}>
      {children}
    </div>
  );
};
