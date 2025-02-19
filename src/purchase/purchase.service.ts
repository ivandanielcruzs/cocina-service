import { Inject, Injectable } from '@nestjs/common';
import { IPurchaseRepository } from 'src/infra/database/interfaces/repositories/purchase.repository';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('IPurchaseRepository')
    private readonly ingredientsRepository: IPurchaseRepository,
  ) {}

  async getPurchase() {
    return this.ingredientsRepository.getPurchases();
  }
}
