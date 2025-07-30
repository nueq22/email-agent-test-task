export interface IMessage {
  id: string;
  date: string;
  from: {
    email: string;
    name: string;
  };
  subject: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
}
