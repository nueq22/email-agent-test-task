import React from "react";

import { withScrollRestoration } from "../shared/WithScrollRestoration/WithScrollRestoration";

const MessagesList: React.FC<MessagesListProps> = ({ children }) => {
  return <div className="space-y-1 p-4">{children}</div>;
};

interface MessagesListProps {
  children: React.ReactNode;
}

const MessagesListWithScrollRestoration = withScrollRestoration(MessagesList);
export default MessagesListWithScrollRestoration;
