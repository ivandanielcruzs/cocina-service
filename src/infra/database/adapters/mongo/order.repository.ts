import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../interfaces/repositories/order.repository';
import { Order } from '../../../../domain/order.domain';
import {
  OrderDocument,
  Order as OrderSche,
} from '../../../../schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipeDocument } from 'src/schemas/recipe.schema';
import { Recipe } from 'src/domain/recipe.domain';
import { IngredientDocument } from 'src/schemas/ingredient.schema';

@Injectable()
export class MongoOrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(OrderSche.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.orderModel
      .findById(orderId)
      .populate({
        path: 'recipeId',
        populate: {
          path: 'ingredients.ingredientId',
          model: 'Ingredient',
        },
      })
      .exec();
    return this.makeOrder(order);
  }

  private makeOrder(order: OrderDocument | null): Order | null {
    if (!order) return null;
    if ((order.recipeId as unknown as RecipeDocument)?.id) {
      const recipeDomain = new Recipe(
        (order.recipeId as unknown as RecipeDocument)._id as string,
        (order.recipeId as unknown as RecipeDocument).name,
        (order.recipeId as unknown as RecipeDocument).ingredients.map(
          (ing) => ({
            id: (ing.ingredientId as unknown as IngredientDocument)
              ._id as string,
            name: (ing.ingredientId as unknown as IngredientDocument).name,
            quantity: ing.quantity,
          }),
        ),
        (order.recipeId as unknown as RecipeDocument).instructions,
      );
      return new Order(
        order._id as string,
        order.userId,
        order.status,
        recipeDomain,
        order.createdAt,
      );
    }
    return new Order(
      order._id as string,
      order.userId,
      order.status,
      order.recipeId,
      order.createdAt,
    );
  }

  async createOrder(orderData: Partial<Order>): Promise<string> {
    const order = new this.orderModel(orderData);
    await order.save();
    return order._id as string;
  }

  async findOrders(
    skip: number,
    limit: number,
    status?: string,
  ): Promise<Order[]> {
    const query = status ? { status } : {};
    const orders = await this.orderModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();
    return orders.map(
      (order) =>
        new Order(
          order._id as string,
          order.userId,
          order.status,
          order.recipeId,
          order.createdAt,
        ),
    );
  }
  async findByIdAndUpdate(id: string, update: object): Promise<boolean> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true },
    );
    return order ? true : false;
  }
}
