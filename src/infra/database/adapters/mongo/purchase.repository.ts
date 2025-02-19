import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PurchaseDocument,
  Purchase as PurchaseDB,
} from 'src/schemas/purchase.schema';
import { Model } from 'mongoose';
import { Purchase } from 'src/domain/purchase.domain';
import { IPurchaseRepository } from '../../interfaces/repositories/purchase.repository';
import { Ingredient } from 'src/domain/ingredient.domain';
import { IngredientDocument } from 'src/schemas/ingredient.schema';

@Injectable()
export class MongoPurchaseRepository implements IPurchaseRepository {
  constructor(
    @InjectModel(PurchaseDB.name)
    private readonly purchaseModel: Model<PurchaseDocument>,
  ) {}

  async getPurchases(): Promise<Purchase[]> {
    const list = await this.purchaseModel
      .find({})
      .populate('ingredientId')
      .exec();
    return list.map(({ id, ingredientId, quantity, orderedAt }) => {
      const ingredient = new Ingredient(
        (ingredientId as unknown as IngredientDocument).id as string,
        (ingredientId as unknown as IngredientDocument).name,
        (ingredientId as unknown as IngredientDocument).stock,
      );
      return new Purchase(id as string, ingredient, quantity, orderedAt);
    });
  }
}
