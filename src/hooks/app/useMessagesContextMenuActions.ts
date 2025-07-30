import type { IMessage } from "../../types/message";

import { useMessages } from "../../hooks/app/useMessages";
import { confirmAction } from "../../utils/confirm";

export function useMessagesContextMenuActions() {
  const { deleteMessage, toggleIsReadFlag } = useMessages();

  return [
    {
      title: "Toggle is read",
      onClick: (message: IMessage) => {
        toggleIsReadFlag(message);
      },
    },
    {
      title: "Delete",
      onClick: (message: IMessage) => {
        confirmAction(() => deleteMessage(message));
      },
    },
  ];
}
