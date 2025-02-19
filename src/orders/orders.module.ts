import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RepositoriesModule } from '../infra/database/adapters/mongo/repositories.module';
import { OrdersController } from './orders.controller';
import { BullModule } from '@nestjs/bullmq';
import { OrderWorkerService } from './orders.workers';
import { NotificationModule } from 'src/infra/notification/notification.module';

@Module({
  imports: [
    RepositoriesModule,
    BullModule.registerQueue({
      name: 'supply-request',
    }),
    BullModule.registerQueue({
      name: 'supply-confirmation',
    }),
    NotificationModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderWorkerService],
  exports: [OrdersService, OrderWorkerService],
})
export class OrdersModule {}
