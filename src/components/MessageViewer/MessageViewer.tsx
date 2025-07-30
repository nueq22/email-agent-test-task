import React from "react";

import type { IMessage } from "../../types/message";

import { getLocalDateTime } from "../../utils/date";
import styles from "./MessageViewer.module.css";

const MessageViewer: React.FC<MessageViewerProps> = ({ message }) => (
  <div>
    <div className={styles.header}>
      <div className={styles.name}>
        <span>{message.from.name}</span>
        <span className={styles.email}>&lt;{message.from.email}&gt;</span>
      </div>
      <div className={styles.date}>
        {getLocalDateTime(new Date(message.date))}
      </div>
    </div>
    <div className={styles.content}>{message.content}</div>
  </div>
);

interface MessageViewerProps {
  message: IMessage;
}
export default React.memo(MessageViewer);
