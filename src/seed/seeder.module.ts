import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { User, UserSchema } from '../schemas/user.schema';
import { Ingredient, IngredientSchema } from '../schemas/ingredient.schema';
import { Recipe, RecipeSchema } from '../schemas/recipe.schema';
import { EncryptService } from '../infra/encrypt/encrypt.service';
import { BcryptAdapter } from '../infra/encrypt/adapter/bcrypt.adapter';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Ingredient.name, schema: IngredientSchema },
      { name: Recipe.name, schema: RecipeSchema },
    ]),
  ],
  providers: [
    SeederService,
    EncryptService,
    {
      provide: 'ENCRYPT_SERVICE',
      useClass: BcryptAdapter, // Se usa bcryptjs como implementación por defecto
    },
  ],
})
export class SeederModule {}
