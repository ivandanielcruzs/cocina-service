import { Inject, Injectable } from '@nestjs/common';
import { IRecipeRepository } from 'src/infra/database/interfaces/repositories/recipe.repository';

@Injectable()
export class RecipesService {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
  ) {}

  async getRecipes() {
    const recipes = await this.recipeRepository.getAllRecipe();
    return recipes;
  }
}
