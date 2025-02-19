import { INotificationProvider } from '../interfaces/notificationProvider.interface';
import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import config from '../privatekey/sdkKey';

@Injectable()
export class FirabaseNotificationProvider implements INotificationProvider {
  private messaging: admin.messaging.Messaging;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(config as admin.ServiceAccount),
      });
    }
    this.messaging = admin.messaging();
  }

  async sendNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    const message = {
      notification: { title, body },
      token,
    };

    try {
      const response = await this.messaging.send(message);
      console.info(`Notificación enviada:`, response);
    } catch (error) {
      console.error(`Error enviando notificación:`, error);
    }
  }
}
