import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RepositoriesModule } from 'src/infra/database/adapters/mongo/repositories.module';
import { RecipesController } from './recipes.controller';

@Module({
  imports: [RepositoriesModule],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule {}
