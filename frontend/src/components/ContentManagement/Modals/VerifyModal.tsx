import { useDispatch } from "react-redux";
import { changeOpenModal } from "../../../state/modals/verifySlice";
export const VerifyAction = ({
  message,
  isOpen,
  toggleIsOpen,
  yesFn,
}: {
  yesFn: () => void;
  toggleIsOpen: () => void;
  isOpen: boolean;
  message: string;
}) => {
  const dispatch = useDispatch();
  return (
    <dialog
      open={isOpen}
      className="text-white border border-yellow-900 rounded-lg dark:bg-gray-800 dark:border-yellow-900 max-w-screen-lg"
    >
      <div>
        <p>{message}</p>
        <button
          onClick={() => {
            yesFn();
            dispatch(changeOpenModal(false));
            toggleIsOpen();
          }}
          className="hover:bg-green-600 hover:border hover:rounded-md"
        >
          Yes
        </button>
      </div>
      <div>
        <button
          className="hover:bg-red-600 hover:border hover:rounded-md"
          onClick={() => {
            // dispatch(changeOpenModal(false));
            // setIsOpenModa(false);
            toggleIsOpen();
          }}
        >
          No
        </button>
      </div>
    </dialog>
  );
};

export default VerifyAction;
