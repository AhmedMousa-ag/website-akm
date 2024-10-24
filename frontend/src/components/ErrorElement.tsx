import { BasePage } from "./BasePage";
import { Header } from "./Header/Header";

export const ErrorElement = ({
  children,
  errorMessage,
}: {
  children?: React.ReactNode;
  errorMessage?: string;
}) => {
  const errMsg = errorMessage ? errorMessage : "Unknown Error Occured";
  return (
    <>
      <Header />
      <BasePage>
        <div>
          <p className="line-through animate-bounce animate-bounce-slow">
            {errMsg}
          </p>
          {children}
        </div>
      </BasePage>
    </>
  );
};
