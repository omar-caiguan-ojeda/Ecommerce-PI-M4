import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication') // Agrupa todas las rutas en la sección "Authentication"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description: 'Permite a un nuevo usuario registrarse proporcionando su información.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en los datos enviados.',
  })
  signUp(@Body() user: CreateUserDto) {   
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newUser } = user;
    return this.authService.singUp(newUser);
  }
  
  @Post('signin')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Permite a un usuario autenticarse proporcionando sus credenciales.',
  })
  @ApiResponse({
    status: 200,
    description: 'Autenticación exitosa. Devuelve un token de acceso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas.',
  })
  signIn(@Body() credentials: UserLoginDto) { 
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
   }
}