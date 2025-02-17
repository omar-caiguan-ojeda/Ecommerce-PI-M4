import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Orders } from './entities/orders.entity';
import { Users } from '../users/entities/users.entity';
import { Products } from '../products/entities/products.entity';
import { OrderDetails } from './entities/orderDetails.entity';
import { formatOrderResponse } from '../utils/orderResponseFormatter';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        @InjectRepository(OrderDetails)
        private readonly orderDetailsRepository: Repository<OrderDetails>,
    ) {}

    async addOrder(userId: string, productId: string[]) {
        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) throw new NotFoundException(`El usuario ingresado con el ID: ${userId}, no existe.`);

        const products = await this.productsRepository.find({
            where: { id: In(productId) },
            relations: ['category'],
        });
        if (products.length !== productId.length) throw new NotFoundException(`El producto ingresado con el ID: ${productId}, no existe.`);

        const totalPrice = products.reduce((total, product) => total + product.price, 0);

        products.forEach((product) => {
            if (product.stock <= 0) throw new NotFoundException(`El producto: ${product.name}, está agotado.`);
            product.stock -= 1;
        });

        await this.productsRepository.save(products);

        const orderDetails = new OrderDetails();
        orderDetails.price = totalPrice;
        orderDetails.products = products;
        await this.orderDetailsRepository.save(orderDetails);

        const order = new Orders();
        order.user = user;
        order.orderDetails = orderDetails;
        order.date = new Date();
        const savedOrder = await this.ordersRepository.save(order);
        return formatOrderResponse(savedOrder);
    }
    
    async getOrder(orderId: string) {
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: { user: true, orderDetails: { products: { category: true } } }, // Incluye category
        });
        if (!order) throw new NotFoundException(`La orden de compra ingresada con el ID: ${orderId}, no existe.`);

        return formatOrderResponse(order);
    }
   
}
