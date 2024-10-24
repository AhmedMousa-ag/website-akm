export const BasePage = ({
  children,
  cssClass,
}: {
  children?: React.ReactNode;
  cssClass?: string;
}) => {
  const baseCssClss =
    "bg-black font-poppins text-white h-screen text-center text-3xl ";
  const cssClassName = cssClass ? baseCssClss + cssClass : baseCssClss;
  return (
    <div className={cssClassName}>
      {children}
      <div className="h-full opacity-30 bg-no-repeat bg-right-top bg-fixed bg-akmpic"></div>
    </div>
  );
};
