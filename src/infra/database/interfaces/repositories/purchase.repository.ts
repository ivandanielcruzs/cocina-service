import { Purchase } from 'src/domain/purchase.domain';

export interface IPurchaseRepository {
  getPurchases(): Promise<Purchase[]>;
}
