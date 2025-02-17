import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Products } from './entities/products.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]), // [Products, Categories]
  CategoriesModule
],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
