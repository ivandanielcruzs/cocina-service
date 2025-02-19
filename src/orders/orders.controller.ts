import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { RequestWithUser } from 'src/infra/security/interfaces/request-with-user.interface';
import { Roles } from 'src/infra/security/decorators/roles.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Roles('GERENTE')
  @Post('/')
  async create(@Request() { user }: RequestWithUser) {
    return this.orderService.create(user.sub);
  }

  @Get()
  async getOrders(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.orderService.getOrders(page || 1, limit || 10, status);
  }

  @Get('/:idOrder')
  async getOrderById(@Param('idOrder') idOrder: string) {
    return this.orderService.getOrderById(idOrder);
  }

  @Roles('CHEF')
  @Patch('/:idRecipe/:idOrder')
  async setRecipe(
    @Param('idRecipe') idRecipe: string,
    @Param('idOrder') idOrder: string,
  ) {
    return this.orderService.setRecipeInOrder(idRecipe, idOrder);
  }

  @Roles('CHEF')
  @Patch('/:idOrder')
  async setFinishedOrder(@Param('idOrder') idOrder: string) {
    return this.orderService.setFinishedOrder(idOrder);
  }
}
