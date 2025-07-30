import { LoaderCircle } from "lucide-react";
import React from "react";

import SplashScreen from "../SplashScreen/SplashScreen";

const SplashLoader: React.FC<SplashLoaderProps> = ({ size = 50 }) => {
  return (
    <SplashScreen className="h-screen text-gray-200">
      <LoaderCircle className="animate-spin" size={size} />
    </SplashScreen>
  );
};

interface SplashLoaderProps {
  size?: number;
}

export default SplashLoader;
