import { BasePage } from "../../components/BasePage";
export const HomePage = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  let cssClass =
    "bg-black font-poppins text-white h-screen text-center text-3xl ";
  cssClass = className ? cssClass + className : cssClass;
  return <BasePage cssClass={cssClass}>{children}</BasePage>;
};
