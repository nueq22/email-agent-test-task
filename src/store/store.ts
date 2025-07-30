import { distinctUntilChanged, filter } from "rxjs";

import type { IFolder } from "../types/folder";
import type { IMessage } from "../types/message";

import { FoldersStore } from "./folders";
import { MessagesStore } from "./messages";

export class Store {
  public folders: FoldersStore;
  public messages: MessagesStore;

  constructor({
    foldersFetcher,
    messagesFetcher,
  }: {
    foldersFetcher: () => Promise<IFolder[]>;
    messagesFetcher: (folderId: string) => Promise<IMessage[]>;
  }) {
    this.folders = new FoldersStore(foldersFetcher);
    this.messages = new MessagesStore(messagesFetcher);

    this.folders.selected$
      .pipe(
        filter((folderId) => folderId != null),
        distinctUntilChanged(),
      )
      .subscribe((folderId) => {
        this.messages.fetchMessages(folderId);
      });
  }
}
