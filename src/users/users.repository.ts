import { Injectable } from "@nestjs/common";

@Injectable()

export class UsersRepository {
    private users =[
        {
            id: 1,
            email: 'toby@mail.com',
            name: 'Tobias',
            password: '111111',
            address: 'Av Siempre Viva 123',
            phone: '123456789',
            country: 'Chile',
            city: 'Puyehue',
        },
        {
            id: 2,
            email: 'omar@mail.com',
            name: 'Omar',
            password: '222222',
            address: 'Av Siempre Viva 456',
            phone: '987654321',
            country: 'Chile',
            city: 'Temuco',
        },
        {
            id: 3,
            email: 'Leonardo@mail.com',
            name: 'Leonardo',
            password: '333333',
            address: 'Av Siempre Viva 789',
            phone: '192837465',
            country: 'Chile',
            city: 'Santiago',
        },
        {
            id: 4,
            email: 'Leonardo@mail.com',
            name: 'Leonardo',
            password: '333333',
            address: 'Av Siempre Viva 789',
            phone: '192837465',
            country: 'Chile',
            city: 'Santiago',
        },
        {
            id: 5,
            email: 'Leonardo@mail.com',
            name: 'Leonardo',
            password: '333333',
            address: 'Av Siempre Viva 789',
            phone: '192837465',
            country: 'Chile',
            city: 'Santiago',
        },
        {
            id: 6,
            email: 'Leonardo@mail.com',
            name: 'Leonardo',
            password: '333333',
            address: 'Av Siempre Viva 789',
            phone: '192837465',
            country: 'Chile',
            city: 'Santiago',
        },
        {
            id: 7,
            email: 'Leonardo@mail.com',
            name: 'Leonardo',
            password: '333333',
            address: 'Av Siempre Viva 789',
            phone: '192837465',
            country: 'Chile',
            city: 'Santiago',
        },
    ];

    async getUsers(page: number, limit: number) {
        const start = (page - 1) * limit;
        const end = start + +limit;
        const users = this.users.slice(start, end);
        return users;
    }

    // async getUserById(id: string) {
    //     return this.users.find(user => user.id === +id);
    //     if (!user) return null;
    //     const { password, ...userWithoutPassword } = user; // Excluir contraseña
    //     return userWithoutPassword;
    // };
    async getUserById(id: string) {
        const user = this.users.find(user => user.id === +id); // Buscar usuario
        if (!user) return null; // Si no existe, retornar null
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user; // Excluir contraseña
        return userWithoutPassword;
    }
    
    async createUser(createUserDto: any ) {
        const newUser = { id: Date.now(), ...createUserDto };  //const newUser = { id: Date.now().toString(), ...createUserDto };
        this.users.push(newUser);
        //return newUser;
        return { id: newUser.id }; // Retorna solo el ID
    };
    /* SUGERENCIA
    import { v4 as uuidv4 } from 'uuid';

        async createUser(createUserDto: any) {
        const newUser = { id: uuidv4(), ...createUserDto };
        this.users.push(newUser);
        return newUser;
        }
    */

    async updateUser(id: string, updateUserDto: any) {
        const userIndex = this.users.findIndex(user => user.id === +id);
        if (userIndex === -1) return null;
        this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
        //return this.users[userIndex];
        return { id }; // Retorna solo el ID
    };
    /* SUGERENCIA
    const userMap = new Map(this.users.map(user => [user.id, user]));

    async updateUser(id, updateUserDto) {
        if (!userMap.has(id)) return null;
        const updatedUser = { ...userMap.get(id), ...updateUserDto };
        userMap.set(id, updatedUser);
        return updatedUser;
    }
    */


    async deleteUser(id: string) {
        const userIndex = this.users.findIndex(user => user.id === +id);
        if (userIndex === -1) return null;
        //const deletedUser = this.users.splice(userIndex, 1);
        //return deletedUser[0];
        this.users.splice(userIndex, 1);
        return { id }; // Retorna solo el ID
    };
}