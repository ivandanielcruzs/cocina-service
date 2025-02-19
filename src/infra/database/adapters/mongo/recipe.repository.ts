import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Recipe as RecipeSche,
  RecipeDocument,
} from '../../../../schemas/recipe.schema';
import { IRecipeRepository } from '../../interfaces/repositories/recipe.repository';
import { Recipe } from '../../../../domain/recipe.domain';
import { IngredientDocument } from 'src/schemas/ingredient.schema';

@Injectable()
export class MongoRecipeRepository implements IRecipeRepository {
  constructor(
    @InjectModel(RecipeSche.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {}

  async getAllRecipe(): Promise<Recipe[]> {
    const recipes = await this.recipeModel
      .find()
      .populate('ingredients.ingredientId')
      .exec();
    return recipes.map(
      (recipe) =>
        new Recipe(
          recipe._id as string,
          recipe.name,
          recipe.ingredients.map((ing) => ({
            id: (ing.ingredientId as unknown as IngredientDocument)
              ._id as string,
            name: (ing.ingredientId as unknown as IngredientDocument).name,
            quantity: ing.quantity,
          })),
          recipe.instructions,
        ),
    );
  }
  async getById(id: string): Promise<Recipe | null> {
    const recipe = await this.recipeModel
      .findById(id)
      .populate('ingredients.ingredientId')
      .exec();
    return recipe
      ? new Recipe(
          recipe._id as string,
          recipe.name,
          recipe.ingredients.map((ing) => ({
            id: (ing.ingredientId as unknown as IngredientDocument)
              ._id as string,
            name: (ing.ingredientId as unknown as IngredientDocument).name,
            quantity: ing.quantity,
          })),
          recipe.instructions,
        )
      : null;
  }
}
