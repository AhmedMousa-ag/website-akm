export const BasePage = ({
  children,
  cssClass,
}: {
  children?: React.ReactNode;
  cssClass?: string;
}) => {
  return (
    <div className={cssClass}>
      {children}
      <div className="h-full opacity-30 bg-no-repeat bg-right-top bg-fixed bg-akmpic"></div>
    </div>
  );
};
