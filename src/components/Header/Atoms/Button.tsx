import React from "react";

export const Button = ({
  children,
  className,
  onClick,
  isActive,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  isActive?: boolean;
}) => {
  let cssClass = "hover:bg-gray-800 ";
  cssClass = isActive ? cssClass + "line-through " : cssClass;
  cssClass = className ? cssClass + className : cssClass;
  return (
    <button onClick={onClick} className={cssClass}>
      {children}
    </button>
  );
};
