import { useCallback } from "react";

import type { IMessage } from "../../types/message";

import { store } from "../../store";
import { useObservable } from "../shared/useObservable";

export function useMessages() {
  const list = useObservable(store.messages.messagesList$, []);
  const isLoading = useObservable(store.messages.isLoading$, false);
  const error = useObservable(store.messages.error$, null);
  const selected = useObservable(store.messages.selected$, null);

  const selectMessage = useCallback((messageId: string | null) => {
    store.messages.selectMessage(messageId);
  }, []);

  const insertMessage = useCallback((message: IMessage) => {
    store.messages.insertMessage(message);
  }, []);

  const toggleIsReadFlag = useCallback((message: IMessage) => {
    store.messages.updateMessage(message.id, { isRead: !message.isRead });
  }, []);

  const deleteMessage = useCallback((message: IMessage) => {
    store.messages.deleteMessage(message);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    store.messages.setSearchQuery(query);
  }, []);

  return {
    list,
    isLoading,
    error,
    selected,
    selectMessage,
    toggleIsReadFlag,
    deleteMessage,
    insertMessage,
    setSearchQuery,
  };
}
