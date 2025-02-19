import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './infra/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthModule } from './infra/security/jwt-auth.module';
import { ConfigModule } from '@nestjs/config';
// import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesModule } from './recipes/recipes.module';
import { BullModule } from '@nestjs/bullmq';
import { PurchaseController } from './purchase/purchase.controller';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2d' },
    }),
    BullModule.forRoot({
      connection: { host: process.env.REDIS_HOST || 'localhost', port: 6379 },
    }),
    AuthModule,
    JwtAuthModule,
    OrdersModule,
    RecipesModule,
    IngredientModule,
    PurchaseModule,
  ],
  controllers: [RecipesController, PurchaseController, IngredientController],
  providers: [],
  exports: [JwtModule],
})
export class AppModule {}
