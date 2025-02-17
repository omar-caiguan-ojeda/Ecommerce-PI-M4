import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../users/entities/users.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
//import { BadRequestException, NotFoundException } from "@nestjs/common";

const MESSAGES = {
    EMAIL_ALREADY_REGISTERED: 'El correo electrónico ingresado ya está registrado. Intenta iniciar sesión o utiliza otra dirección de correo.',
    LOGIN_SUCCESS: 'El usuario inició sesión.',
    INVALID_CREDENTIALS: 'Nombre de usuario o contraseña inválida.',
    USER_REGISTERED: 'Usuario registrado con éxito.',
};

describe('AuthService', () => {
    let service: AuthService;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let usersRepository: Repository<Users>;

    // Mocks flexibles
    const mockUsersRepository = {
        findOneBy: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                JwtService,
                {
                    provide: getRepositoryToken(Users),
                    useValue: mockUsersRepository,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia los mocks entre pruebas
    });

    // Test básico para definir el servicio
    it('El servicio de autenticación está definido como entorno de prueba', () => {
        expect(service).toBeDefined();
    });

    // Test: Registro de usuario sin incluir contraseña en la respuesta
    it('No debe retornar la propiedad password en userWithoutPassword', async () => {
        const mockUser: Partial<Users> = {
            name: "Leo",
            email: "leo@gmail.com",
            password: "Password@123",
            phone: 1234567,
            country: "Chile",
            address: "La Mosqueta S/N",
            city: "Entre Lagos",
            isAdmin: true,
        };

        mockUsersRepository.findOneBy.mockResolvedValue(null); // Simula que el correo no está registrado
        mockUsersRepository.save.mockResolvedValue({
            ...mockUser,
            id: "1234",
            password: "hashedPassword",
        });

        const result = await service.singUp(mockUser);

        expect(result.userWithoutPassword).not.toHaveProperty('password');
        expect(result.userWithoutPassword.email).toBe(mockUser.email);
        expect(result.message).toBe(MESSAGES.USER_REGISTERED);
    });

    // Test: Registro con un correo ya existente
    it('Debe lanzar una excepción si el correo ya está registrado', async () => {
        const existingUser: Partial<Users> = {
            id: "1234",
            email: "existing@gmail.com",
        };

        mockUsersRepository.findOneBy.mockResolvedValue(existingUser as Users);

        const newUser: Partial<Users> = {
            name: "New User",
            email: "existing@gmail.com",
            password: "Password@1234",
        };

        await expect(service.singUp(newUser)).rejects.toThrow(MESSAGES.EMAIL_ALREADY_REGISTERED);
    });

    // Test: Inicio de sesión exitoso
    it('Debe retornar un token válido si las credenciales son correctas', async () => {
        const mockUser: Partial<Users> = {
            id: "1234",
            email: "valid@gmail.com",
            password: await bcrypt.hash("Password@123", 10),
        };

        mockUsersRepository.findOneBy.mockResolvedValue(mockUser as Users);

        const jwtSpy = jest.spyOn(service['jwtService'], 'sign').mockReturnValue('fake-token');

        const result = await service.signIn(mockUser.email, "Password@123");

        expect(result.token).toBe('fake-token');
        expect(result.message).toBe(MESSAGES.LOGIN_SUCCESS);
        expect(jwtSpy).toHaveBeenCalledWith({
            id: mockUser.id,
            email: mockUser.email,
            isAdmin: mockUser.isAdmin,
        });
    });

    // Test: Inicio de sesión con credenciales incorrectas
    it('Debe lanzar una excepción si las credenciales son incorrectas', async () => {
        const mockUser: Partial<Users> = {
            id: "1234",
            email: "valid@gmail.com",
            password: await bcrypt.hash("Password@123", 10),
        };

        mockUsersRepository.findOneBy.mockResolvedValue(mockUser as Users);

        // Caso: Contraseña incorrecta
        await expect(service.signIn(mockUser.email, "WrongPassword")).rejects.toThrow(MESSAGES.INVALID_CREDENTIALS);

        // Caso: Usuario no encontrado
        mockUsersRepository.findOneBy.mockResolvedValue(null);
        await expect(service.signIn("notfound@gmail.com", "Password@123")).rejects.toThrow(MESSAGES.INVALID_CREDENTIALS);
    });
});
