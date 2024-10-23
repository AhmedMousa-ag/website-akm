import { BasePage } from "../../components/BasePage";
export const HomePage = ({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <BasePage className={className}>{children}</BasePage>;
};
