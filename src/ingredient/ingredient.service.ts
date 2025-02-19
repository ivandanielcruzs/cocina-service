import { Inject, Injectable } from '@nestjs/common';
import { Ingredient } from 'src/domain/ingredient.domain';
import { IIngredientsRepository } from 'src/infra/database/interfaces/repositories/ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(
    @Inject('IIngredientsRepository')
    private readonly ingredientsRepository: IIngredientsRepository,
  ) {}

  async getIngredients(): Promise<Ingredient[]> {
    return this.ingredientsRepository.getListIngredients();
  }
}
