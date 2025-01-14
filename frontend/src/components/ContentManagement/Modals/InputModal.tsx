import {
  useImperativeHandle,
  useRef,
  forwardRef,
  ReactNode,
  useState,
  FormEvent,
} from "react";
import { OpenImperativeHandle } from "../../../types/generic";
import { createPortal } from "react-dom";

export const InputModal = forwardRef<
  OpenImperativeHandle,
  {
    children?: ReactNode;
    buttonsChildren?: ReactNode;
    title: string;
    onSubmitFn: (events: FormEvent<HTMLFormElement>) => void;
  }
>(({ children, buttonsChildren, title, onSubmitFn }, ref) => {
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

  return createPortal(
    <dialog ref={dialog}>
      <div className="font-montserrat text-white bg-black p-5 ">
        <h3 className="text-center text-2xl">{title}</h3>
        <br />
        <form onSubmit={(event) => onSubmitFn(event)}>
          <div className="flex space-y-3 flex-col gap-2">{children}</div>
          {buttonsChildren}
        </form>
      </div>
    </dialog>,
    document.getElementById("modal")!,
  );
});
