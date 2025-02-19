import { Order } from '../../../../domain/order.domain';

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  createOrder(orderData: Partial<Order>): Promise<string>;
  findOrders(skip: number, limit: number, status?: string): Promise<Order[]>;
  findByIdAndUpdate(id: string, update: object): Promise<boolean>;
}
