import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/infra/database/adapters/mongo/repositories.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [PurchaseService],
})
export class PurchaseModule {}
