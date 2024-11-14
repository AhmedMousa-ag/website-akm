import { NavBar } from "./NavBar";
import { NavElementRight } from "./NavElements";
import { NavLink } from "react-router-dom";
export const Header = ({ children }: { children?: React.ReactNode }) => {
  const hoverClass = " rounded hover:blur-[0.06rem] hover:line-through";
  function transActCss(baseCss: string, isActive: boolean) {
    return isActive ? baseCss + " line-through" : baseCss;
  }
  return (
    <>
      <NavBar className="flex bg-black text-white justify-between h-20 font-montserrat">
        <NavLink
          to="/"
          className={({ isActive }) =>
            transActCss(`mt-6 ml-6 ${hoverClass}`, isActive)
          }
          end
        >
          <p>Ahmed Karem Mousa</p>
        </NavLink>
        <NavElementRight className="mt-6">
          <NavLink
            to="projects"
            className={({ isActive }) =>
              transActCss(`mt-6 ${hoverClass}`, isActive)
            }
          >
            Personal Projects
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) => transActCss(hoverClass, isActive)}
          >
            History
          </NavLink>
          <NavLink to="linkedIn" className={hoverClass}>
            LinkedIn
          </NavLink>
          <NavLink to="github" className={hoverClass}>
            Github
          </NavLink>
          <NavLink to="login_akm" />
        </NavElementRight>
      </NavBar>
      {children}
    </>
  );
};
