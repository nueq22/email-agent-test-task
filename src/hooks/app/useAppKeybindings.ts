import { useMemo } from "react";

import { confirmAction } from "../../utils/confirm";
import { useKeyBindings } from "../shared/useKeybindings";
import { useMessages } from "./useMessages";

export function useAppKeybindings() {
  const { selected, selectMessage, deleteMessage } = useMessages();

  const keymap = useMemo(() => {
    if (!selected) {
      return;
    }

    const deleteWithConfirmation = () => {
      confirmAction(() => deleteMessage(selected));
    };

    return {
      Escape: {
        handler: () => selectMessage(null),
      },
      Delete: {
        handler: deleteWithConfirmation,
      },
      Backspace: {
        modifier: "ctrlKey" as const,
        handler: deleteWithConfirmation,
      },
    };
  }, [selected, selectMessage, deleteMessage]);

  useKeyBindings(keymap);
}
