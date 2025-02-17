import { Controller, Get, Put, Delete, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UuidValidationPipe } from '../common/pipes/uuid-validation.pipe';

@ApiTags('Users') // Agrupa todas las rutas en la sección "Users"
@Controller('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Obtener lista de usuarios',
    description: 'Devuelve una lista de usuarios con paginación (solo administradores).',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado.',
  })
  getUsers(@Query() query: GetUsersDto) {
    const { page, limit } = query;
    return this.usersService.getUsers(page, limit);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Obtener un usuario por ID',
    description: 'Devuelve la información de un usuario específico identificado por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario obtenido exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  getUserById(@Param('id', UuidValidationPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Actualizar información de un usuario',
    description: 'Actualiza los datos de un usuario autenticado o identificado por un administrador.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado.',
  })
  updateUser(
    @Param('id', UuidValidationPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto, 
    @Req() req: any
  ) { 
    
    const authenticatedUser = req.user;
    return this.usersService.updateUser(id, updateUserDto, authenticatedUser);
  }

  @ApiBearerAuth()
  @Put(':id/promote')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Promover a administrador',
    description: 'Asigna privilegios de administrador a un usuario existente (solo administradores).',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario promovido exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado.',
  })
  promoteToAdmin(@Param('id', UuidValidationPipe) id: string) { 
    return this.usersService.promoteToAdmin(id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Eliminar un usuario',
    description: 'Elimina un usuario de la base de datos (solo administradores).',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado.',
  })
  deleteUser(@Param('id', UuidValidationPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
