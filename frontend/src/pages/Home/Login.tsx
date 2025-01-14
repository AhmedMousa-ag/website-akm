import { FormEvent, useEffect, useRef } from "react";
import { InputModal } from "../../components/ContentManagement/Modals/InputModal";
import { OpenImperativeHandle } from "../../types/generic";
import { BasePage } from "../../components/BasePage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { changeLoggedIn } from "../../state/login/loginSlice";
import { usePostLoginMutation } from "../../state/login/loginApiSlice";
import { LoginResponse } from "../../types/apis/login";
import { LoadingBouncer } from "../../components/Loading";

export const Login = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.isLoggedIn.isLoggedIn,
  );
  const dispatch = useDispatch();
  const dialogRef = useRef<OpenImperativeHandle>(null);
  const [postLoginMutation, { isLoading, isError, error }] =
    usePostLoginMutation();
  const navigate = useNavigate();
  const statusTextCss = "text-xs text-center";
  let api_status = (
    <p className={statusTextCss}>Please Enter your crednetials</p>
  );
  useEffect(() => {
    dialogRef.current?.toggle();
    if (isLoggedIn) {
      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);
  const handleCloseButton = () => {
    dialogRef.current?.toggle();
    navigate("/");
  };
  const handleLoginButton: React.FormEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const loginBody = {
      username: formData.get("username")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };
    postLoginMutation(loginBody)
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", response.token!);
        dispatch(changeLoggedIn(true));
        navigate("/");
      });
  };
  if (isError) {
    if ("data" in error) {
      const errorResponse = error.data as LoginResponse;
      api_status = (
        <p className={statusTextCss}>
          {" "}
          {`Error sending request: ${errorResponse.error}`}
        </p>
      );
    }
  }
  if (isLoading) {
    api_status = <LoadingBouncer extra_classes={statusTextCss} />;
  }
  const inputcss = "text-black rounded-sm";
  const className = "space ";
  return (
    <BasePage>
      {!isLoggedIn && (
        <InputModal
          ref={dialogRef}
          title="Login"
          onSubmitFn={(e: FormEvent<HTMLFormElement>) => {
            handleLoginButton(e);
          }}
          buttonsChildren={
            <div className=" flex justify-evenly text-center text-xl ">
              <div>
                <button onClick={handleCloseButton}>Close</button>
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </div>
          }
        >
          <>
            <div>
              <label className={className}>{"Username: "}</label>
              <input
                className={inputcss}
                name="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div>
              <label className={className}>{"Password: "}</label>
              <input
                className={inputcss}
                name="password"
                type="password"
                placeholder="Password"
              />
              <div>{api_status}</div>
            </div>
          </>
        </InputModal>
      )}
      {isLoggedIn && <p>You are already logged in...</p>}
    </BasePage>
  );
};
