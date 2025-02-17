import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Orders } from "../../orders/entities/orders.entity";

@Entity({
    name: 'USERS'
})

export class Users {
    /**
        * @description * Id único de cada usuario y debe ser de tipo UUID. Lo genera automaticamente la Base de Datos. 
        * @example "b3e37112-6896-4d02-a75c-812cdc2ad3f1"
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
        * @description * Nombre del usuario. Es de tipo Varchar, debe tener una logitud de 50 caracteres. Es un campo obligatorio y no acepta valores nulos. 
        * @example 'Leonardo'
    */
    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;
    
    /**
        * @description * Email del usuario. Es de tipo Varchar, debe tener una logitud de 50 caracteres. Es un campo obligatorio y no acepta valores nulos. 
        * @example 'leonardo@gmail.com'
    */
    @Column({ type: "varchar", length: 50, nullable: false, unique: true })
    email: string;
    
    /**
        * @description * Password del usuario. Es de tipo Varchar. Es un campo obligatorio y no acepta valores nulos. 
        * @example 'Password@123'
    */
    @Column({ type: 'varchar', nullable: false })
    password: string;
    
    /**
        * @description * Número de teléfono del usuario. Es de tipo Number Integer. 
        * @example '123456789'
    */
    @Column({ type: "int" })
    phone: number;
    
    /**
        * @description * Pais al que pertenece el usuario. Es de tipo Varchar con una loguitud de 50 caracteres. 
        * @example 'Argentina'
    */
    @Column({ type: "varchar", length: 50 })
    country: string;
    
    /**
        * @description * Domicilio al que pertenece el usuario. Es de tipo Text. 
        * @example 'Argentina'
    */
    @Column({ type: "text" })
    address: string;
    
    /**
        * @description * Ciudad al que pertenece el usuario. Es de tipo Varchar, con una loguitud de 50 caracteres. 
        * @example 'Argentina'
    */
    @Column({ type: "varchar", length: 50 })
    city: string;
    
    /**
        * @description * Este campo indica si el usuario es Administrador o no. Es de tipo Boolean y por defecto tendra un valor "false". 
        * @example 'false'
    */
    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    /**
     * @description Relación uno-a-muchos entre la entidad Usuarios y la entidad Pedidos (Orders).
     * Un usuario puede tener múltiples pedidos asociados. 
     * Esta relación está definida por la clave foránea `user` en la tabla de pedidos.
     * @example [{ id: "order-1" }, { id: "order-2" }]
     */
    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: "orders_id" })
    orders: Orders[];
}