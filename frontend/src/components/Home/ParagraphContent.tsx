import { ReactNode } from "react";

export const PargraphContent = ({
  children,
  extraCss,
}: {
  children: ReactNode;
  extraCss?: String;
}) => {
  const clasName =
    "border border-gray-200 rounded-lg dark:border-gray-100 max-w-screen-lg text-xl " +
    extraCss;
  const bottomMargin = " mb-[90px] ";
  return <div className={clasName + bottomMargin}>{children}</div>;
};
