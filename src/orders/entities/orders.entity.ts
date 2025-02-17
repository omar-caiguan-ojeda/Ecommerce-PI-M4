import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { Users } from "../../users/entities/users.entity";

@Entity({
    name: "ORDERS"
})

export class Orders {
    /**
        * @description Identificador único de la orden. Es de tipo UUID y se genera automáticamente.
        * @example "c7e65b38-7a2b-4c8a-989c-2cda0d4f0f32"
    */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
        * @description Fecha de creación de la orden. Se genera automáticamente al momento de registrar la orden.
        * Es de tipo timestamp.
        * @example "2025-01-04T15:35:12.000Z"
    */
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date

    /**
        * @description Relación uno a uno con los detalles de la orden. Este campo define los productos y cantidades de la orden.
        * La relación está definida en la entidad `OrderDetails`.
        * @example { totalAmount: 199.99, items: [{ productId: "b3e37112-6896-4d02-a75c-812cdc2ad3f1", quantity: 2 }] }
    */
    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;

    /**
        * @description Relación muchos a uno con la entidad de usuarios. Define qué usuario realizó la orden.
        * La clave foránea es `user_id`, que referencia al campo `id` en la tabla `USERS`.
        * @example { id: "f9c4d3f8-8b2c-4a3e-9898-c2dcd0d4f0f3", name: "Leonardo", email: "leonardo@gmail.com" }
    */
    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: Users;
}