import { BasePage } from "./BasePage";

export const ErrorElement = ({
  children,
  errorMessage,
}: {
  children?: React.ReactNode;
  errorMessage?: string;
}) => {
  const errMsg = errorMessage ? errorMessage : "Unknown Error Occured";
  return (
    <BasePage>
      <div>
        <p className="line-through animate-bounce animate-bounce-slow">
          {errMsg}
        </p>
        {children}
      </div>
    </BasePage>
  );
};
