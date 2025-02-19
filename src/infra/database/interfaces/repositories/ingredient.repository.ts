import { Ingredient } from 'src/domain/ingredient.domain';

export interface IIngredientsRepository {
  getListIngredients(): Promise<Ingredient[]>;
}
