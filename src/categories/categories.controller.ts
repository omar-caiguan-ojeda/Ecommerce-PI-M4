// import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// import { CategoriesService } from './categories.service';
// import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
// import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';

// @Controller('categories')
// export class CategoriesController {
//   constructor(private readonly categoriesService: CategoriesService) {}

//   @Get('seeder')
//   getCategories(){
//     return this.categoriesService.addCategories();
//   }

//   @Post()
//   create(@Body() createCategoryDto: CreateCategoryDto) {
//     return this.categoriesService.create(createCategoryDto);
//   }

//   @Get()
//   findAll() {
//     return this.categoriesService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id', UuidValidationPipe) id: string) {
//     console.log(id)
//     return this.categoriesService.findOne(id);
//   }

//   @Put(':id')
//   update(
//     @Param('id', UuidValidationPipe) id: string, 
//     @Body() updateCategoryDto: UpdateCategoryDto) {
//     return this.categoriesService.update(id, updateCategoryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id', UuidValidationPipe) id: string) {
//     return this.categoriesService.remove(id);
//   }
// }

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';

@ApiTags('Categories') // Agrupa todas las rutas en la sección "Categories"
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  @ApiOperation({
    summary: 'Generar categorías de prueba',
    description: 'Llena la base de datos con categorías de ejemplo.',
  })
  @ApiResponse({
    status: 201,
    description: 'Categorías generadas exitosamente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al generar categorías.',
  })
  getCategories() {
    return this.categoriesService.addCategories();
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva categoría',
    description: 'Permite crear una nueva categoría en la base de datos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos enviados.',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas las categorías',
    description: 'Devuelve una lista de todas las categorías disponibles.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías obtenida con éxito.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener las categorías.',
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una categoría por ID',
    description: 'Devuelve los detalles de una categoría específica identificada por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría obtenida con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  findOne(@Param('id', UuidValidationPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una categoría',
    description: 'Permite actualizar una categoría existente identificada por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos enviados.',
  })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una categoría',
    description: 'Permite eliminar una categoría específica identificada por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoría no encontrada.',
  })
  remove(@Param('id', UuidValidationPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
