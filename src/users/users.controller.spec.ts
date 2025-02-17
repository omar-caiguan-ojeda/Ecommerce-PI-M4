import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
    sing: jest.fn(),
    verify: jest.fn(),
}

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const mockUsersService = {
            getUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService
                }
        ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });

    it('Debe inicializarse correctamente', () => {
        expect(usersController).toBeDefined();
    });

    it('Debe obtener todos los usuarios paginados', async () => {
        const mockUsers: Partial<Users>[] = [
            { id: '1', name: 'User 1' },
            { id: '2', name: 'User 2' },
        ];

        jest.spyOn(usersService, 'getUsers').mockResolvedValue({
            page: 1,
            limit: 2,
            total: 2,
            data: mockUsers as Users[],
        });

        
        const query = { page: 1, limit: 2 };
        const result = await usersController.getUsers(query);
        expect(result).toEqual({
            page: 1,
            limit: 2,
            total: 2,
            data: mockUsers,
        });
        expect(usersService.getUsers).toHaveBeenCalledWith(1, 2);
    });

    it('Debe obtener un usuario por su ID', async () => {
        const mockUser = {
            id: '1',
            name: 'User 1',
            email: 'user1@test.com',
            phone: 123456789,
            country: 'Testland',
            address: '123 Test St',
            city: 'Test City',
            isAdmin: false,
            orders: [{ id: 'o1', date: new Date() }],
        };
        jest.spyOn(usersService, 'getUserById').mockResolvedValue(mockUser);

        const result = await usersController.getUserById('1');
        expect(result).toEqual(mockUser);
        expect(usersService.getUserById).toHaveBeenCalledWith('1');
    });

    it('Debe lanzar un error al no encontrar un usuario por su ID', async () => {
        jest.spyOn(usersService, 'getUserById').mockRejectedValue(
            new NotFoundException('Usuario no encontrado'),
        );

        await expect(usersController.getUserById('99')).rejects.toThrow(
            NotFoundException,
        );
    });

    it('Debe eliminar un usuario por su ID', async () => {
        const mockResponse = { id: '1', message: 'Usuario eliminado' };
        jest.spyOn(usersService, 'deleteUser').mockResolvedValue(mockResponse);

        const result = await usersController.deleteUser('1');
        expect(result).toEqual(mockResponse);
        expect(usersService.deleteUser).toHaveBeenCalledWith('1');
    });
});
