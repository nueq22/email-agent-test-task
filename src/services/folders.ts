import { faker } from "@faker-js/faker";

import type { IFolder } from "../types/folder";

export function fetchFolders(): Promise<IFolder[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve([
          {
            key: "inbox",
            name: "Inbox",
          },
          {
            key: "starred",
            name: "Starred",
          },
          {
            key: "important",
            name: "Important",
          },
          {
            key: "empty",
            name: "Empty",
          },
          {
            key: "error",
            name: "Error",
          },
        ]);
      },
      faker.number.int({ min: 250, max: 1000 }),
    );
  });
}
