import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('File Upload') // Agrupa las rutas bajo la categoría "File Upload" en Swagger
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  @ApiBearerAuth()
  @Post('uploadImage/:productId')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Subir imagen para un producto',
    description:
      'Permite a los administradores subir una imagen asociada a un producto. La imagen debe cumplir con los requisitos de tamaño y tipo.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Imagen cargada con éxito.',
  })
  @ApiResponse({
    status: 400,
    description: 'El archivo no cumple con los requisitos de validación.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuario no autenticado.',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario no autorizado para realizar esta acción.',
  })

  async uploadImage(
    @Param('productId', UuidValidationPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024, //200000
            message: 'El archivo debe tener un tamaño máximo de 200 KB.',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    ) file: Express.Multer.File
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
