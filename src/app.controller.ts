import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Application') // Agrupa las rutas relacionadas bajo la etiqueta "Application"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener mensaje de bienvenida',
    description: 'Devuelve un mensaje de bienvenida desde el servicio principal.',
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje de bienvenida obtenido exitosamente.',
    schema: {
      example: 'Hello, World!',
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno del servidor.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}