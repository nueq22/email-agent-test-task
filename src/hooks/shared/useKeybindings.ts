import { useEffect } from "react";

export function useKeyBindings(keymap?: {
  [key: string]: {
    modifier?: "ctrlKey" | "shiftKey" | "altKey" | "metaKey";
    handler: () => void;
  };
}) {
  useEffect(() => {
    if (!keymap) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const config = keymap?.[event.key];

      if (!config) {
        return;
      }

      if (config.modifier && !event[config.modifier]) {
        return;
      }

      config.handler();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keymap]);
}
