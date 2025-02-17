import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async getUsers(page: number = 1, limit: number = 10) {
        const [data, total] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        });
        return { page, limit, total, data };
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findOne({ 
            where: { id },
            relations: ['orders']
        });

        if (!user) {
        throw new NotFoundException(`El usuario con ID: ${id}, no fué encontrado.`);
        }
        
        const orders = user.orders?.map(order => ({
            id: order.id,
            date: order.date,
        }));
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            country: user.country,
            address: user.address,
            city: user.city,
            orders,
        };
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto, authenticatedUser: any) {  
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
        throw new NotFoundException(`El usuario con ID: ${id}, no fué encontrado.`);
        }
        
        const updatedFields = Object.keys(updateUserDto).filter(
            (key) => updateUserDto[key] !== undefined && key !== 'confirmPassword',
        );
        if (updatedFields.length === 0) {
            return { 
                id, 
                message: `El usuario con ID: ${id}, no realizó ningun cambio durante la actualización.`
            };
        }
    
        if ('isAdmin' in updateUserDto) {
            if (!authenticatedUser.isAdmin) {
            throw new ForbiddenException('Solo los administradores pueden modificar el campo isAdmin.');
            }
        } 
        
        if (updateUserDto.password) {
            const salt = await bcrypt.genSalt(10);
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
        }
        
        const updatedUser = this.usersRepository.create({ ...user, ...updateUserDto });
        await this.usersRepository.save(updatedUser);
        
        const formattedFields = updatedFields.map((field) => `'${field}'`).join(', ');
        return {
            id,
            message: `El usuario con el ID: ${id}, há actualizado los siguientes campos con éxito: ${formattedFields}.`,
        };
    }

    async promoteToAdmin(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
        throw new NotFoundException(`El usuario con ID: ${id}, no fué encontrado.`);
        }

        user.isAdmin = true;
        await this.usersRepository.save(user);

        return { 
            id, 
            message: `El usuario con ID: ${id}, fué promovido a administrador con éxito.` 
        };
    }

    // async deleteUser(id: string) {
    //     const user = await this.usersRepository.delete(id);

    //     if (user.affected === 0) {
    //     throw new NotFoundException(`El usuario con ID: ${id}, no fué encontrado.`);
    //     }
        

    //     return { 
    //         id, 
    //         message: `Usuario con ID: ${id}, fué eliminado con éxito.` 
    //     };
    // }
    async deleteUser(id: string) {
        // Buscar al usuario por su ID, incluyendo las órdenes asociadas
        const user = await this.usersRepository.findOne({ 
            where: { id },
            relations: ['orders'], // Incluir la relación con las órdenes
        });
    
        if (!user) {
            throw new NotFoundException(`El usuario con ID: ${id}, no fue encontrado.`);
        }
    
        // Verificar si el usuario tiene órdenes asociadas
        if (user.orders && user.orders.length > 0) {
            throw new ForbiddenException(`No se puede eliminar el usuario con ID: ${id} porque tiene órdenes asociadas.`);
        }
    
        // Eliminar el usuario
        const result = await this.usersRepository.delete(id);
    
        if (result.affected === 0) {
            throw new NotFoundException(`El usuario con ID: ${id}, no fue encontrado.`);
        }
    
        return { 
            id, 
            message: `El usuario con ID: ${id}, fue eliminado con éxito.` 
        };
    }
    
}