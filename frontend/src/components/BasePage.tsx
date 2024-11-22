import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { toggleIsEditing } from "../state/basePage";

export const BasePage = ({
  children,
  cssClass,
}: {
  children?: React.ReactNode;
  cssClass?: string;
}) => {
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const baseCssClss =
    "bg-black h-fit min-h-screen font-montserrat text-white  text-center text-3xl";
  const cssClassName = cssClass ? baseCssClss + cssClass : baseCssClss;
  return (
    <div className={cssClassName}>
      <div className="h-fit min-h-screen bg-no-repeat bg-[60rem] bg-fixed bg-akmpic background:rgba(0,0,0,0.3);">
        {token && token !== "" ? (
          <div className="flex justify-end p-10">
            <button
              onClick={() => dispatch(toggleIsEditing())}
              className={`border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-100 text-xl text-wrap ${isEdittingState ? "hover:bg-red-600" : "hover:bg-green-600"}`}
            >
              {isEdittingState ? "Cancel" : "Add Item"}
            </button>
          </div>
        ) : undefined}
        <div>{children}</div>
      </div>
    </div>
  );
};
