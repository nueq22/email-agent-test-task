import { faker } from "@faker-js/faker";

import type { IMessage } from "../types/message";

import { createMessage } from "../stubs/messages";

// can be replaced with a static json data import, as was mentioned in the test task
const mockedResponses: Record<string, IMessage[]> = {
  inbox: Array.from({ length: 100 }, createMessage),
  starred: Array.from({ length: 100 }, createMessage),
  important: Array.from({ length: 200 }, createMessage),
  empty: [],
};

export function fetchMessages(folderId: string): Promise<IMessage[]> {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const messages = mockedResponses[folderId];
        if (messages) {
          resolve(messages);
        } else {
          reject(new Error(`Folder ${folderId} not found`));
        }
      },
      faker.number.int({ min: 500, max: 1000 }),
    );
  });
}
