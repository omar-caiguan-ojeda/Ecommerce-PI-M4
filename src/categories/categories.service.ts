import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as data from '../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(@InjectRepository(Categories) private categoriesRepository: Repository<Categories>) {}

  // Este método será llamado automáticamente al iniciar el módulo
  async onModuleInit() {
    await this.addCategories();
  }

  async addCategories() {
    const categories = data.map(product => ({ name: product.category }));

    // Inserción optimizada
    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values(categories)
      .orIgnore()       // ..antes:   .onConflict(`("name") DO NOTHING`)
      .execute();

    console.log('Categories preloaded');
    return 'Categories Added';
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException('El nombre de la categoría ya existe.');
    }

    return this.categoriesRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(id: string) {
    const category = await this.categoriesRepository.findOneBy({id})
    if(!category) {
      //throw new HttpException ('La categoría no existe...', 404)
      throw new NotFoundException (`La categoría con el ID: ${id}, no existe.`)
    }
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Verificar si el nombre actualizado ya existe y no es la misma categoría
    const existingCategory = await this.categoriesRepository.findOne({
      where: { name: updateCategoryDto.name },
    });

    if (existingCategory && existingCategory.id !== id) {
      throw new BadRequestException('El nombre de la categoría ya existe.');
    }

    // Actualizar la categoría
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.categoriesRepository.findOne({ where: { id } });
  }


  async remove(id: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    
    if (!category) {
      throw new NotFoundException(`La categoría con ID: ${id}, no fue encontrada.`);
    }

    if (category.products.length > 0) {
      throw new BadRequestException('No se puede eliminar la categoría porque tiene productos asociados.');
    }
  
    await this.categoriesRepository.delete(id);
  }
}
