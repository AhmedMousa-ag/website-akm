import React from "react";

export const Button = ({
  children,
  className,
  onClick,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  isActive?: boolean;
}) => {
  let cssClass = "hover:bg-gray-800 ";
  cssClass = className ? cssClass + className : cssClass;
  return (
    <button onClick={onClick} className={cssClass}>
      {children}
    </button>
  );
};
