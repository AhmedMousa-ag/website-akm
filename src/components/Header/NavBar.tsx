import { NavBarProps } from "../../types/childrenProps";
export const NavBar = ({ className: classNames, children }: NavBarProps) => {
  return <nav className={classNames}>{children}</nav>;
};
