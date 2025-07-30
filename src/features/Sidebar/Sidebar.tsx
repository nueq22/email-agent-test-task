import React, { useMemo } from "react";

import Sidebar from "../../components/shared/Sidebar/Sidebar";
import { useFolders } from "../../hooks/app/useFolders.ts";
import { sidebarIconsMap } from "./Sidebar.utils.tsx";

const AppSidebar: React.FC = () => {
  const { folders, select, selected } = useFolders();

  const sidebarItems = useMemo(
    () =>
      folders.map((folder) => ({
        key: folder.key,
        label: folder.name,
        icon:
          folder.key in sidebarIconsMap ? sidebarIconsMap[folder.key] : null,
      })),
    [folders],
  );

  return (
    <Sidebar
      items={sidebarItems}
      selectedItem={selected}
      onItemClick={select}
    />
  );
};

export default React.memo(AppSidebar);
