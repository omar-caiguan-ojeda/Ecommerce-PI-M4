import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity';
import * as data from '../data.json'; // Asegúrate de que contenga productos.
import { Categories } from '../categories/entities/categories.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  // Precarga de productos al iniciar el módulo
  async onModuleInit() {
    await this.addProducts();
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find(); // Obtiene las categorías existentes
  
    if (categories.length < 1) {
      throw new NotFoundException('Category not found');  // Ejemplo de Error que se debe replicar en el código
    }

    for (const element of data) {
      const category = categories.find(cat => cat.name === element.category);
  
      if (!category) continue; // Si no encuentra la categoría, omitir el producto
  
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.category = category;
  
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orIgnore() // Evita duplicados
        .execute();
    }
  
    console.log('Products preloaded');
    return 'Products Added';
  }
  
  async getProducts(page: number, limit: number) {
    const [result, total] = await this.productsRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
    return { total, products: result };
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOne({ 
      where: { id },
      relations: { category: true }
    });
    if(!product) {
      throw new NotFoundException(`El producto con el Id: ${id} no existe.`)
    }
    return product
  }

  // async createProduct(createProductDto: any) {
  //   const category = await this.categoriesRepository.findOneBy({ id: createProductDto.categoryId })
  //   if (!category) {
  //     const errors : string[] = []
  //     errors.push('La categoría no existe.')
  //     throw new NotFoundException(errors)
  //   }
  //   return this.productsRepository.save({
  //     ...createProductDto, 
  //     category
  //   })
  // }

  async createProduct(createProductDto: CreateProductDto) {
    // Validar si la categoría existe
    const category = await this.categoriesRepository.findOneBy({ id: createProductDto.categoryId });
    if (!category) {
      throw new NotFoundException(`La categoría con ID ${createProductDto.categoryId} no existe.`);
    }
  
    // Crear el producto utilizando el repositorio
    const product = this.productsRepository.create({
      ...createProductDto,
      category, // Relación de categoría
    });
  
    try {
      // Guardar el producto en la base de datos
      const savedProduct = await this.productsRepository.save(product);
      return savedProduct;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new BadRequestException('Error al crear el producto. Verifica los datos ingresados.');
    }
  }
  

// async updateProduct(id: string, updateProductDto: any) {
//   const { category_id } = updateProductDto;
//   // Verificar si la categoría existe
//   if (category_id) {
//     const categoryExists = await this.categoriesRepository.findOneBy({ id: category_id });

//     if (!categoryExists) {
//       throw new NotFoundException(`La categoría con el ID ${category_id} no existe.`);
//     }
//   }
//   // Actualizar el producto
//   try {
//     await this.productsRepository.update(id, updateProductDto);
//     return this.getProductById(id);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (error) {
//     throw new BadRequestException('Error al actualizar el producto.');
//   }
// }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`El producto con ID: ${id} no fue encontrado.`);
    }

    // Verificar si la categoría existe
    if (updateProductDto.categoryId) {
      const categoryExists = await this.categoriesRepository.findOneBy({ id: updateProductDto.categoryId });
      if (!categoryExists) {
        throw new NotFoundException(`La categoría con el ID ${updateProductDto.categoryId} no existe.`);
      }
    }

    // Filtrar campos actualizados
    const updatedFields = Object.keys(updateProductDto).filter(
      (key) => updateProductDto[key] !== undefined
    );

    if (updatedFields.length === 0) {
      return {
        id,
        message: `El producto con ID: ${id} no realizó ningún cambio durante la actualización.`,
      };
    }

    // Realizar la actualización
    const updatedProduct = this.productsRepository.create({ ...product, ...updateProductDto });
    const savedProduct = await this.productsRepository.save(updatedProduct);

    // Formatear campos actualizados para el mensaje
    const formattedFields = updatedFields.map((field) => `'${field}'`).join(', ');

    return {
      message: `El producto con el ID: ${id} ha actualizado los siguientes campos con éxito: ${formattedFields}.`,
      product: savedProduct,
    };
  }


  async deleteProduct(id: string) {
    const product = await this.getProductById(id)
    await this.productsRepository.remove(product)
    return `El producto con el id: ${ id } fue eliminado con éxito.`;
  }
}
