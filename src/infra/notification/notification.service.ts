import { Inject, Injectable } from '@nestjs/common';
import { INotificationProvider } from './interfaces/notificationProvider.interface';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificator: INotificationProvider,
  ) {}

  async sendNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    await this.notificator.sendNotification(token, title, body);
  }
}
