import { Controller, Get, Post, Param, Body, UseGuards} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';
import { CreateOrderDto } from './dto/orders.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';

@ApiTags('Orders') // Agrupa las rutas bajo la categoría "Orders" en Swagger
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Crear una nueva orden',
    description: 'Permite crear una orden de compra asociada a un usuario, especificando los productos a incluir.',
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada con éxito.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos enviados.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autenticado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no existe.',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const productIds = products.map((product) => product.id); // Extraer los IDs de los productos
    return this.ordersService.addOrder(userId, productIds);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Obtener detalles de una orden',
    description: 'Devuelve los detalles de una orden específica identificada por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden obtenida con éxito.',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autenticado.',
  })
  async getOrder(@Param('id', UuidValidationPipe) id: string) {
    return await this.ordersService.getOrder(id);
  }
}