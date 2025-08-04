import React from "react";

import { withScrollRestoration } from "../shared/WithScrollRestoration/WithScrollRestoration";

const MessagesList: React.FC<MessagesListProps> = ({ children, scrollRef }) => {
  return (
    <div ref={scrollRef} className="space-y-1 p-4">
      {children}
    </div>
  );
};

interface MessagesListProps {
  children: React.ReactNode;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

const MessagesListWithScrollRestoration = withScrollRestoration(MessagesList);
export default MessagesListWithScrollRestoration;
