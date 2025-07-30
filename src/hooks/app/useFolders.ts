import { useCallback } from "react";

import { store } from "../../store";
import { useObservable } from "../shared/useObservable";

export function useFolders() {
  const folders = useObservable(store.folders.list$, []);
  const isLoading = useObservable(store.folders.isLoading$, false);
  const error = useObservable(store.folders.error$, null);
  const selected = useObservable(store.folders.selected$, null);

  const fetch = useCallback(() => {
    store.folders.fetch();
  }, []);

  const select = useCallback((folderId: string) => {
    store.folders.select(folderId);
  }, []);

  return { folders, fetch, isLoading, error, selected, select };
}
