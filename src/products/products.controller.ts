import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';
import { GetProductsDto } from './dto/get-product.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Products') // Agrupa las rutas bajo la categoría "Products" en Swagger
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos',
    description: 'Obtiene una lista paginada de productos según los parámetros proporcionados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida con éxito.',
  })
  getProducts(@Query() query: GetProductsDto) {
    const { page, limit } = query;
    return this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  @ApiOperation({
    summary: 'Generar productos iniciales',
    description: 'Crea datos iniciales de productos para fines de prueba.',
  })
  @ApiResponse({
    status: 201,
    description: 'Productos iniciales generados exitosamente.',
  })
  getCategories(){
    return this.productsService.addProducts();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description: 'Devuelve los detalles de un producto específico identificado por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  getProductById(@Param('id', UuidValidationPipe) id: string) {       // ==> ParseUUIDPipe
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Permite crear un producto proporcionando los datos necesarios.',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado con éxito.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos enviados.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso restringido.',
  })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productsService.createProduct(createProductDto);
      return {
        message: 'Producto creado con éxito.',
        product,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Actualizar un producto',
    description: 'Permite actualizar los datos de un producto existente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado con éxito.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso restringido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  async updateProduct(
    @Param('id', UuidValidationPipe) id: string, 
    @Body() updateProductDto: UpdateProductDto
  ) {
    //return this.productsService.updateProduct(id, updateProductDto);
    const response = await this.productsService.updateProduct(id, updateProductDto);
    return {
      message: response.message,
      product: response.product,
    }
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Eliminar un producto',
    description: 'Permite eliminar un producto identificado por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado con éxito.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso restringido.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  deleteProduct(@Param('id', UuidValidationPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
