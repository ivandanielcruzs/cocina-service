import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../infra/database/adapters/mongo/repositories.module';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [RepositoriesModule],
  controllers: [IngredientController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule {}
