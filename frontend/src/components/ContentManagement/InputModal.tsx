import {
  useImperativeHandle,
  useRef,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import { OpenImperativeHandle } from "../../types/generic";
import { createPortal } from "react-dom";

export const InputModal = forwardRef<
  OpenImperativeHandle,
  { children?: ReactNode; buttonsChildren?: ReactNode; title: string }
>(({ children, buttonsChildren, title }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useImperativeHandle(ref, () => {
    return {
      toggle() {
        if (isOpen) {
          dialog.current?.close();
          setIsOpen(false);
        } else {
          dialog.current?.showModal();
          setIsOpen(true);
        }
      },
    };
  });
  // Title
  // Image
  // Paragraph

  return createPortal(
    <dialog ref={dialog}>
      <div className="font-poppins text-white bg-black space-y-3">
        <h3 className="text-center text-2xl">{title}</h3>
        <br />
        <form>
          <div className="flex space-y-3 flex-col gap-2">{children}</div>
        </form>
        {buttonsChildren}
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
});
