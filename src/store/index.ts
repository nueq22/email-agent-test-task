import { fetchFolders } from "../services/folders";
import { fetchMessages } from "../services/messages";
import { Store } from "./store";

export const store = new Store({
  foldersFetcher: fetchFolders,
  messagesFetcher: fetchMessages,
});
