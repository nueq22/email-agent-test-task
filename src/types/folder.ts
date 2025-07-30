export interface IFolder {
  key: "inbox" | "starred" | "important" | "empty" | "error";
  name: string;
}
