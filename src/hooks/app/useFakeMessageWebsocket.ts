import { useEffect } from "react";

import type { IMessage } from "../../types/message";

import { createMessage } from "../../stubs/messages";

export function useFakeMessageWebsocket({
  subscriber,
  enabled,
}: {
  subscriber: (message: IMessage) => void;
  enabled: boolean;
}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let timeoutId: number;

    function dispatchMessage() {
      const period = 10 * 1000;

      timeoutId = setTimeout(() => {
        const message = createMessage();
        message.date = new Date().toISOString();
        message.isRead = false;
        subscriber(message);
        dispatchMessage();
      }, period);
    }

    dispatchMessage();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [enabled, subscriber]);
}
