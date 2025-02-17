import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/orders.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from '../products/entities/products.entity';
import { Users } from '../users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails, Products, Users]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
