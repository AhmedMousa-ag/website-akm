import { useState } from "react";
import { NavBar } from "./NavBar";
import { NavElementRight } from "./NavElements";
import { NavLink } from "react-router-dom";

export const Header = ({ children }: { children?: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const hoverClass = " rounded hover:blur-[0.06rem] hover:line-through";
  
  function transActCss(baseCss: string, isActive: boolean) {
    return isActive ? baseCss + " line-through" : baseCss;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <NavBar className="flex bg-black text-white justify-between items-center h-20 font-montserrat px-4 md:px-6 relative">
        {/* Logo/Name - Always visible */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            transActCss(`text-sm sm:text-base ${hoverClass}`, isActive)
          }
          end
        >
          <p className="truncate max-w-[150px] sm:max-w-none">Ahmed Karem Mousa</p>
        </NavLink>

        {/* Desktop Navigation */}
        <NavElementRight className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <NavLink
            to="personal-projecst"
            className={({ isActive }) =>
              transActCss(`text-sm lg:text-base ${hoverClass}`, isActive)
            }
          >
            Personal Projects
          </NavLink>
          <NavLink
            to="certificate"
            className={({ isActive }) => 
              transActCss(`text-sm lg:text-base ${hoverClass}`, isActive)
            }
          >
            Certificates
          </NavLink>
          <NavLink 
            to="linkedIn" 
            className={`text-sm lg:text-base ${hoverClass}`}
          >
            LinkedIn
          </NavLink>
          <NavLink 
            to="github" 
            className={`text-sm lg:text-base ${hoverClass}`}
          >
            Github
          </NavLink>
          <NavLink to="login_akm" />
        </NavElementRight>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span 
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden fixed top-20 right-0 w-64 bg-black border-l border-gray-700 z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <NavLink
              to="personal-projecst"
              className={({ isActive }) =>
                transActCss(`py-2 border-b border-gray-700 ${hoverClass}`, isActive)
              }
              onClick={toggleMobileMenu}
            >
              Personal Projects
            </NavLink>
            <NavLink
              to="certificate"
              className={({ isActive }) => 
                transActCss(`py-2 border-b border-gray-700 ${hoverClass}`, isActive)
              }
              onClick={toggleMobileMenu}
            >
              Certificates
            </NavLink>
            <NavLink 
              to="linkedIn" 
              className={`py-2 border-b border-gray-700 ${hoverClass}`}
              onClick={toggleMobileMenu}
            >
              LinkedIn
            </NavLink>
            <NavLink 
              to="github" 
              className={`py-2 border-b border-gray-700 ${hoverClass}`}
              onClick={toggleMobileMenu}
            >
              Github
            </NavLink>
          </nav>
        </div>
      </NavBar>
      {children}
    </>
  );
};