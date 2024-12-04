import React, { FC, useContext, useMemo } from "react";
import { ThemeContext } from "../App";

interface ButtonProps {
  name: string;
  handleClick: () => void;
  isPrimary?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  name,
  handleClick,
  isPrimary = true,
  className,
}) => {
  const context = useContext(ThemeContext);

  const themeStyle = useMemo<string>(() => {
    if (context?.isDarkMode) {
      return "bg-white text-blue-500 hover:bg-blue-50";
    }
    return isPrimary
      ? "bg-blue-500 border-blue-500"
      : "bg-gray-500 border-gray-500";
  }, [context?.isDarkMode, isPrimary]);

  return (
    <button
      onClick={handleClick}
      className={`border w-28 h-10 px-2 rounded-md text-white   ${themeStyle} ${className}`}
    >
      {name}
    </button>
  );
};

export default Button;
