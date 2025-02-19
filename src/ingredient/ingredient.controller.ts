import { Controller, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientsService: IngredientService) {}

  @Get('/')
  async getIngredients() {
    return this.ingredientsService.getIngredients();
  }
}
