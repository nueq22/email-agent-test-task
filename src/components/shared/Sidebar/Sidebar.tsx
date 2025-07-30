import cn from "classnames";
import React, { type ReactNode } from "react";

import styles from "./Sidebar.module.css";

const Sidebar: React.FC<SidebarProps> = ({
  items,
  selectedItem,
  onItemClick,
}) => (
  <aside className={styles.sidebar}>
    <ul className={styles.list}>
      {items.map((item) => {
        return (
          <li key={item.key}>
            <button
              type="button"
              className={cn(styles.button, {
                [styles.selected as string]: item.key === selectedItem,
              })}
              onClick={() => onItemClick(item.key)}
              title={item.label}
            >
              <div className={styles.label}>
                {item.icon ? <span>{item.icon}</span> : null}
                <span className="desktop-only">{item.label}</span>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  </aside>
);

interface SidebarProps {
  items: Array<{
    key: string;
    label: string;
    icon?: ReactNode;
  }>;
  selectedItem: string | null;
  onItemClick: (itemKey: string) => void;
}

export default React.memo(Sidebar);
