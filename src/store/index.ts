import { fetchFolders } from "../services/folders";
import { fetchMessages } from "../services/messages";
import { FoldersStore } from "./folders";
import { MessagesStore } from "./messages";
import { Store } from "./store";

export const store = new Store({
  folders: new FoldersStore(fetchFolders),
  messages: new MessagesStore(fetchMessages),
});
