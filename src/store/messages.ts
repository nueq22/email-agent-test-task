import { BehaviorSubject, combineLatest, map } from "rxjs";

import type { IMessage } from "../types/message";

export class MessagesStore {
  private error = new BehaviorSubject<string | null>(null);
  public error$ = this.error.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  private messagesList = new BehaviorSubject<IMessage[]>([]);
  public messagesList$ = this.messagesList.asObservable();

  private messagesMap = new BehaviorSubject<Map<string, IMessage>>(new Map());

  private selected = new BehaviorSubject<string | null>(null);
  public selected$ = combineLatest([this.messagesMap, this.selected]).pipe(
    map(([messagesMap, selected]) => {
      if (selected === null) {
        return null;
      }
      const record = messagesMap.get(selected);
      return record && !record.isDeleted ? record : null;
    }),
  );

  private fetcher: (folderId: string) => Promise<IMessage[]>;

  constructor(messagesFetcher: (folderId: string) => Promise<IMessage[]>) {
    this.fetcher = messagesFetcher;

    this.messagesMap.subscribe((messagesMap) => {
      this.updateList(messagesMap);
    });
  }

  public deleteMessage(message: IMessage) {
    this.upsertMessage({ ...message, isDeleted: true });
  }

  public async fetchMessages(folderId: string) {
    try {
      this.error.next(null);
      this.isLoading.next(true);
      const messages = await this.fetcher(folderId);
      this.messagesMap.next(
        new Map(messages.map((message) => [message.id, message])),
      );
    } catch (error) {
      console.error(error);
      this.messagesMap.next(new Map());
      this.error.next("Error loading messages");
    } finally {
      this.isLoading.next(false);
    }
  }

  public insertMessage(message: IMessage) {
    if (this.messagesMap.value.has(message.id)) {
      return;
    }
    this.upsertMessage(message);
  }

  public selectMessage(messageId: string | null) {
    this.selected.next(messageId);
  }

  public updateMessage(messageId: string, updates: Partial<IMessage>) {
    const existing = this.messagesMap.value.get(messageId);
    if (existing) {
      this.upsertMessage({ ...existing, ...updates });
    }
  }

  private updateList(messagesMap: Map<string, IMessage>) {
    const sortedMessages = Array.from(messagesMap.values())
      .filter((message) => !message.isDeleted)
      .toSorted(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    this.messagesList.next(sortedMessages);
  }

  private upsertMessage(message: IMessage) {
    const updatedMap = new Map(this.messagesMap.value);
    updatedMap.set(message.id, message);
    this.messagesMap.next(updatedMap);
  }
}
