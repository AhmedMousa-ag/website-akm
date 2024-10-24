// import MyPic from "../assets/my-picture.png";

export const BasePage = ({
  children,
  cssClass,
}: {
  children?: React.ReactNode;
  cssClass?: string;
}) => {
  const className =
    "h-full opacity-30 bg-no-repeat bg-right-top bg-fixed bg-akmpic";
  return (
    <div className={cssClass}>
      {children}
      <div className={className}></div>
    </div>
  );
};
