import cn from "classnames";
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

import styles from "./Toolbar.module.css";

const Toolbar: React.FC<ToolbarProps> = ({ actions }) => {
  return (
    <div className={styles.toolbar}>
      {actions.map((action, index) => {
        const { className, ...rest } = action.props || {};
        return (
          <button
            key={index}
            type="button"
            className={cn(styles.button, className)}
            onClick={action.onClick}
            {...rest}
          >
            {action.children}
          </button>
        );
      })}
    </div>
  );
};

interface ToolbarProps {
  actions: Array<{
    children: ReactNode;
    onClick: () => void;
    props?: ButtonHTMLAttributes<HTMLButtonElement>;
  }>;
}
export default React.memo(Toolbar);
