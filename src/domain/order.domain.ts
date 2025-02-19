import { Recipe } from './recipe.domain';

export class Order {
  constructor(
    public id: string | null,
    public userId: string,
    public status: string,
    public recipeId: string | null | Recipe,
    public createdAt: Date | null,
  ) {}
}
