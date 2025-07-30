import cn from "classnames";
import React from "react";

import type { IMessage } from "../../types/message.ts";

import { getConsentedDate } from "../../utils/date.ts";
import styles from "./MessagesListItem.module.css";

const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  isSelected,
  onClick,
  onContextMenu,
}) => {
  const handleClick = () => {
    onClick(message.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    onContextMenu(e, message);
  };

  // handle key down to allow user to use div as button from the keyboard
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      key={message.id}
      className={cn(styles.item, {
        [styles.unread as string]: !message.isRead,
        [styles.selected as string]: isSelected,
      })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.date}>
        {getConsentedDate(new Date(message.date))}
      </div>
      <div className={styles.name} title={message.from.email}>
        {message.from.name}
      </div>
      <div className={styles.subject}>{message.subject}</div>
      <div className={styles.content}>{message.content}</div>
    </div>
  );
};

interface MessageListItemProps {
  message: IMessage;
  isSelected: boolean;
  onClick: (messageId: string) => void;
  onContextMenu: (e: React.MouseEvent, message: IMessage) => void;
}

export default React.memo(MessageListItem);
