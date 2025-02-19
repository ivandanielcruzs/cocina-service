import { Ingredient } from './ingredient.domain';

export class Purchase {
  constructor(
    public id: string | null,
    public ingredientId: string | Ingredient,
    public quantity: number,
    public orderedAt: Date,
  ) {}
}
