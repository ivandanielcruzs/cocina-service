export interface INotificationProvider {
  sendNotification(token: string, title: string, body: string): Promise<void>;
}
