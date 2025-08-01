import { faker } from "@faker-js/faker";

import type { IMessagesQueryParams } from "../store/messages";
import type { IMessage } from "../types/message";

import { createMessage } from "../stubs/messages";

// can be replaced with a static json data import, as was mentioned in the test task
const mockedResponses: Record<string, IMessage[]> = {
  inbox: Array.from({ length: 100 }, createMessage),
  starred: Array.from({ length: 100 }, createMessage),
  important: Array.from({ length: 200 }, createMessage),
  empty: [],
};

export function fetchMessages(
  params: IMessagesQueryParams,
): Promise<IMessage[]> {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        console.log("q", params);
        let messages =
          params.folderId &&
          Object.hasOwnProperty.call(mockedResponses, params.folderId)
            ? mockedResponses[params.folderId]
            : null;

        if (messages) {
          if (params.query) {
            messages = messages.filter((message) =>
              [
                message.from.name,
                message.from.email,
                message.subject,
                message.content,
              ].some((field) =>
                field.toLowerCase().includes(params.query.toLowerCase()),
              ),
            );
          }
          resolve(messages);
        } else {
          reject(new Error(`Folder ${params.folderId} not found`));
        }
      },
      faker.number.int({ min: 500, max: 1000 }),
    );
  });
}
