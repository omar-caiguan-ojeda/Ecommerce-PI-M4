import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    // Verificar si el encabezado `Authorization` existe
    if (!authorizationHeader) {
      throw new UnauthorizedException('El encabezado Authorization es obligatorio');
    }

    // Verificar que el encabezado tiene el formato correcto
    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'El formato del token es inválido. Use Bearer <token>',
      );
    }

    const token = parts[1];

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret }); // ==> payload: { id, email, isAdmin, exp, iat }

      // Convertir las marcas de tiempo de UNIX a objetos Date para mayor legibilidad
      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      // Asignar roles al usuario según el valor de isAdmin
      user.roles = user.isAdmin ? ['admin'] : ['user'];

      // Asignar el usuario decodificado al objeto request
      request.user = user;

      return true;
    } catch (error) {
      // Lanzar mensajes personalizados según el tipo de error
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado, por favor inicie sesión nuevamente');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('El token es inválido, proporcione un token válido');
      } else {
        throw new UnauthorizedException('No se pudo autenticar el token');
      }
    }
  }
}
