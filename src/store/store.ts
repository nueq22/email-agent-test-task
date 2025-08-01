import { distinctUntilChanged, filter } from "rxjs";

import { FoldersStore } from "./folders";
import { MessagesStore } from "./messages";

export class Store {
  public folders: FoldersStore;
  public messages: MessagesStore;

  constructor({
    folders,
    messages,
  }: {
    folders: FoldersStore;
    messages: MessagesStore;
  }) {
    this.folders = folders;
    this.messages = messages;

    this.folders.selected$
      .pipe(
        filter((folderId) => folderId != null),
        distinctUntilChanged(),
      )
      .subscribe((folderId) => {
        this.messages.setFolderId(folderId);
      });
  }
}
