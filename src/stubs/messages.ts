import { faker } from "@faker-js/faker";

import type { IMessage } from "../types/message";

export function createMessage(): IMessage {
  return {
    id: faker.string.uuid(),
    date: faker.date.past().toISOString(),
    from: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    },
    subject: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    isRead: faker.datatype.boolean(),
    isDeleted: false,
  };
}
