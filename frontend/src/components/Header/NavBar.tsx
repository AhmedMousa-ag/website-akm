import { NavBarProps } from "../../types/generic";
export const NavBar = ({ className: classNames, children }: NavBarProps) => {
  return <nav className={classNames}>{children}</nav>;
};
