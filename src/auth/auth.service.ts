import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private jwtService: JwtService,
    ) {}

    async singUp(user: Partial<Users>) {
        const foundUser = await this.usersRepository.findOneBy({ email: user.email });
        if (foundUser) {
            throw new BadRequestException('El correo electrónico ingresado ya está registrado. Intenta iniciar sesión o utiliza otra dirección de correo.');
        }

        // Hashear contraseña y guardar usuario
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashedPassword };
        const savedUser = await this.usersRepository.save(newUser);

        // Retornar usuario sin contraseña
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, isAdmin, ...userWithoutPassword } = savedUser; // <== password,
        return {
            userWithoutPassword, 
            message: 'Usuario registrado con éxito.'
        };
    }

    async signIn(email: string, password: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException('Nombre de usuario o contraseña inválida.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new NotFoundException('Nombre de usuario o contraseña inválida.');
        }

        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        const token = this.jwtService.sign(payload);

        return {
            token,
            message: `'Inicío seción con exito el usuario con ID: ${user.id}`,
        };
    }
}
