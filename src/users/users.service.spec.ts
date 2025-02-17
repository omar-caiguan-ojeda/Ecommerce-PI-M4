import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const mockUsersRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('El servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });
  describe('createUser', () => {
  });

  describe('getUserById', () => {
    it('Debe lanzar una excepción si el usuario no existe', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getUserById('1')).rejects.toThrow(NotFoundException);
    });

    it('Debe retornar el usuario si existe', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        orders: [{ id: 'order1', date: '2023-12-30' }],
      } as any);

      const result = await service.getUserById('1');
      expect(result).toEqual({
        id: '1',
        name: undefined,
        email: 'test@test.com',
        phone: undefined,
        country: undefined,
        address: undefined,
        city: undefined,
        isAdmin: undefined,
        orders: [{ id: 'order1', date: '2023-12-30' }],
      });
    });
  });

  describe('updateUser', () => {
    it('Debe lanzar una excepción si el usuario no existe', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.updateUser('1', { email: 'updated@test.com' }, { isAdmin: false }),
      ).rejects.toThrow(NotFoundException);
    });

    it('Debe actualizar los datos de un usuario existente', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue({ id: '1', email: 'test@test.com' } as Users);
      jest.spyOn(usersRepository, 'save').mockResolvedValue({
        id: '1',
        email: 'updated@test.com',
      } as Users);

      const result = await service.updateUser('1', { email: 'updated@test.com' }, { isAdmin: true });
      expect(result).toEqual({
        id: '1',
        message: "El usuario con el ID: 1, há actualizado los siguientes campos con éxito: 'email'.",
      });
    });
  });

  describe('deleteUser', () => {
    it('Debe lanzar una excepción si el usuario no existe', async () => {
      jest.spyOn(usersRepository, 'delete').mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.deleteUser('1')).rejects.toThrow(NotFoundException);
    });

    it('Debe eliminar un usuario existente', async () => {
      jest.spyOn(usersRepository, 'delete').mockResolvedValue({ affected: 1, raw: {} });

      const result = await service.deleteUser('1');
      expect(result).toEqual({
        id: '1',
        message: 'Usuario con ID: 1, fué eliminado con éxito.',
      });
    });
  });
});
