import cn from "classnames";
import React from "react";

import styles from "./LinearLoader.module.css";

const LinearLoader: React.FC<LinearLoaderProps> = ({ className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.line} />
    </div>
  );
};

interface LinearLoaderProps {
  className?: string;
}

export default LinearLoader;
