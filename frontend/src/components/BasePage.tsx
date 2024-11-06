export const BasePage = ({
  children,
  cssClass,
}: {
  children?: React.ReactNode;
  cssClass?: string;
}) => {
  const token = localStorage.getItem("token");
  let addButton = undefined;
  if (token && token !== "") {
    addButton = (
      <div className="flex justify-end p-10">
        <button className="border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-100 text-xl text-wrap ">
          Add Item
        </button>
      </div>
    );
  }
  const baseCssClss =
    "bg-black font-poppins text-white h-screen text-center text-3xl";
  const cssClassName = cssClass ? baseCssClss + cssClass : baseCssClss;
  return (
    <div className={cssClassName}>
      <div className="h-full bg-no-repeat bg-[60rem] bg-fixed bg-akmpic background:rgba(0,0,0,0.3);">
        {addButton}
        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
};
