import cn from "classnames";
import React, { type ReactNode } from "react";

const SplashScreen: React.FC<SplashScreenProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full h-full items-center justify-center select-none",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface SplashScreenProps {
  children?: ReactNode;
  className?: string;
}

export default SplashScreen;
