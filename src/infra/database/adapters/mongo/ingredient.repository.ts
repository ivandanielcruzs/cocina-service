import { Ingredient } from 'src/domain/ingredient.domain';
import { Injectable } from '@nestjs/common';
import {
  IngredientDocument,
  Ingredient as IngredientDB,
} from 'src/schemas/ingredient.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IIngredientsRepository } from '../../interfaces/repositories/ingredient.repository';

@Injectable()
export class MongoIngredientsRepository implements IIngredientsRepository {
  constructor(
    @InjectModel(IngredientDB.name)
    private readonly ingredientModel: Model<IngredientDocument>,
  ) {}

  async getListIngredients(): Promise<Ingredient[]> {
    const listIngredients = await this.ingredientModel.find({}).exec();
    return listIngredients.map(
      ({ id, stock, name }) => new Ingredient(id as string, name, stock),
    );
  }
}
