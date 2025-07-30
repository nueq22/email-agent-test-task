import { FileWarningIcon, Flag, Mail, NonBinary, Stars } from "lucide-react";

const iconSize = 16;

export const sidebarIconsMap = {
  inbox: <Mail size={iconSize} />,
  starred: <Stars size={iconSize} />,
  important: <Flag size={iconSize} />,
  empty: <NonBinary size={iconSize} />,
  error: <FileWarningIcon size={iconSize} />,
};
