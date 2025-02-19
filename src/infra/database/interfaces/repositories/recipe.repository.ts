import { Recipe } from 'src/domain/recipe.domain';

export interface IRecipeRepository {
  getAllRecipe(): Promise<Recipe[]>;
  getById(id: string): Promise<Recipe | null>;
}
