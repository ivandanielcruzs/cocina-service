import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IOrderRepository } from '../infra/database/interfaces/repositories/order.repository';
import { Order } from 'src/domain/order.domain';
import { IRecipeRepository } from 'src/infra/database/interfaces/repositories/recipe.repository';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { NotificationService } from 'src/infra/notification/notification.service';
import { IUserRepository } from 'src/infra/database/interfaces/repositories/user.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @InjectQueue('supply-request') private supplyQueue: Queue,
    private readonly notification: NotificationService,
  ) {}

  async create(userId: string) {
    const user = await this.userRepository.findByUserName('chef_1');
    const order = new Order(null, userId, 'SOLICITADA', null, null);
    const idOrder = await this.orderRepository.createOrder(order);
    const body = {
      orderId: idOrder,
      extraInsctructions: 'Se ha creado una nueva orden.',
    };
    await this.notification.sendNotification(
      user?.token as string,
      'Se ha creado una nueva orden',
      JSON.stringify(body),
    );
    return idOrder;
  }

  async getOrders(page = 1, limit = 10, status?: string) {
    const skip = (page - 1) * limit;
    return this.orderRepository.findOrders(skip, limit, status);
  }

  async getOrderById(idOrder: string) {
    return this.orderRepository.findById(idOrder);
  }

  async setRecipeInOrder(recipeId: string, orderId: string): Promise<void> {
    const recipe = await this.recipeRepository.getById(recipeId);
    if (!recipe) throw new NotFoundException('Recipe not found');
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'SOLICITADA' || order.recipeId) {
      throw new ConflictException('Order already has a recipe');
    }
    try {
      const verifyStock = recipe.ingredients.map(({ id, quantity }) => ({
        id,
        quantity,
      }));
      console.info(
        `Send to reviewed Stock: id: ${orderId} - ${verifyStock.length}`,
      );
      await this.supplyQueue.add('request-supply', { orderId, verifyStock });
      const updatedObject = { recipeId, status: 'PENDIENTE' };
      await this.orderRepository.findByIdAndUpdate(orderId, updatedObject);
    } catch (error) {
      console.error('track error', error);
      throw new Error('Unexpected error ocurs');
    }
  }

  async setFinishedOrder(orderId: string): Promise<void> {
    const findOrder = await this.orderRepository.findById(orderId);
    if (findOrder?.status !== 'EN_PROCESO') {
      throw new ConflictException('Order is not in a property status');
    }
    try {
      const user = await this.userRepository.findByUserName('gerente');
      await this.orderRepository.findByIdAndUpdate(orderId, {
        status: 'COMPLETADO',
      });
      console.info('se envía al token', user?.token);
      const body = {
        orderId,
        extraInsctructions: 'La orden ha sido completada.',
      };
      await this.notification.sendNotification(
        user?.token as string,
        'La orden ha sido completada.',
        JSON.stringify(body),
      );
    } catch (error) {
      console.error('track error', error);
      throw new Error('Unexpected error ocurs');
    }
  }
}
