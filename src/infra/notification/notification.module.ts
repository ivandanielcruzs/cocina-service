import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { FirabaseNotificationProvider } from './adapter/notificationProvider.adapter';

@Module({
  imports: [],
  providers: [
    NotificationService,
    {
      provide: 'NOTIFICATION_SERVICE',
      useClass: FirabaseNotificationProvider,
    },
  ],
  exports: [NotificationService, 'NOTIFICATION_SERVICE'],
})
export class NotificationModule {}
