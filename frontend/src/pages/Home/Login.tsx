import { useEffect, useRef } from "react";
import { InputModal } from "../../components/ContentManagement/InputModal";
import { OpenImperativeHandle } from "../../types/generic";
import { BasePage } from "../../components/BasePage";
import { token } from "../../configs/constanst";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dialogRef = useRef<OpenImperativeHandle>(null);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    dialogRef.current?.toggle();
  }, []);
  const handleCloseButton = () => {
    dialogRef.current?.toggle();
    navigate("/");
  };
  const handleLoginButton = () => {};
  const inputcss = "text-black rounded-sm";
  const className = "space ";
  return (
    <BasePage>
      {!token && (
        <InputModal
          ref={dialogRef}
          title="Login"
          buttonsChildren={
            <div className=" flex justify-evenly text-center text-xl ">
              <div>
                <button onClick={handleCloseButton}>Close</button>
              </div>
              <div>
                <button onClick={handleLoginButton}>Login</button>
              </div>
            </div>
          }
        >
          <>
            <div>
              <label className={className}>{"Username: "}</label>
              <input className={inputcss} type="text" />
            </div>
            <div>
              <label className={className}>{"Password: "}</label>
              <input className={inputcss} type="password" />
            </div>
          </>
        </InputModal>
      )}
    </BasePage>
  );
};
