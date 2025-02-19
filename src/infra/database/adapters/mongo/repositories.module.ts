import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../../../../schemas/user.schema';
import { MongoUserRepository } from './user.repository';
import { MongoOrderRepository } from './order.repository';
import { Order, OrderSchema } from '../../../../schemas/order.schema';
import { Recipe, RecipeSchema } from '../../../../schemas/recipe.schema';
import { MongoRecipeRepository } from './recipe.repository';
import {
  Ingredient,
  IngredientSchema,
} from '../../../../schemas/ingredient.schema';
import { PurchaseSchema, Purchase } from 'src/schemas/purchase.schema';
import { MongoIngredientsRepository } from './ingredient.repository';
import { MongoPurchaseRepository } from './purchase.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: User.name, schema: UserSchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: Ingredient.name, schema: IngredientSchema },
      { name: Purchase.name, schema: PurchaseSchema },
    ]),
  ],
  providers: [
    { provide: 'IUserRepository', useClass: MongoUserRepository },
    { provide: 'IOrderRepository', useClass: MongoOrderRepository },
    { provide: 'IRecipeRepository', useClass: MongoRecipeRepository },
    { provide: 'IIngredientsRepository', useClass: MongoIngredientsRepository },
    { provide: 'IPurchaseRepository', useClass: MongoPurchaseRepository },
  ],
  exports: [
    'IUserRepository',
    'IOrderRepository',
    'IRecipeRepository',
    'IIngredientsRepository',
    'IPurchaseRepository',
  ],
})
export class RepositoriesModule {}
