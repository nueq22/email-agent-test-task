import { useEffect } from "react";

export function useKeyBindings(keymap?: { [key: string]: () => void }) {
  useEffect(() => {
    if (!keymap) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const handler = keymap?.[event.key];

      if (handler) {
        handler();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keymap]);
}
