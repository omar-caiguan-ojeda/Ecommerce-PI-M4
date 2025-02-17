import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "../../products/entities/products.entity";

@Entity({ 
    name: "ORDER_DETAILS",
})

export class OrderDetails {
    /**
        * @description Identificador único de los detalles de la orden. Es de tipo UUID y se genera automáticamente.
        * @example "d5f1d5b4-7f85-4cba-991a-2cdbe7c5b143"
    */
    @PrimaryGeneratedColumn ("uuid")
    id: string;

    /**
        * @description Precio total de los productos incluidos en esta orden. Es un valor decimal con una precisión de 10 dígitos, incluyendo 2 decimales.
        * @example 299.99
    */
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    /**
        * @description Relación muchos a muchos con los productos incluidos en la orden. Define qué productos están asociados con estos detalles.
        * Los datos de la relación se almacenan en la tabla `ORDER_DETAILS_PRODUCTS`.
        * @example [
        *   { id: "a123b456-7c89-4d01-8e23-5f67890abcde", name: "Smartphone XYZ", price: 199.99, quantity: 1 },
        *   { id: "f234g567-8h90-5i12-9j34-6k78901bcdef", name: "Wireless Headphones", price: 99.99, quantity: 1 }
    * ]
   */
    @ManyToMany(() => Products)
    @JoinTable({ name: "ORDER_DETAILS_PRODUCTS" })
    products: Products[];

    /**
        * @description Relación uno a uno con la orden a la que pertenecen estos detalles. 
        * La clave foránea es `order_id`, que referencia al campo `id` en la tabla `ORDERS`.
        * @example { id: "b7c8d9e0-1f23-4g45-9h67-8i90123jklmn", date: "2025-01-04T15:35:12.000Z", userId: "f234g567-8h90-5i12-9j34-6k78901bcdef" }
    */
    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({ name: "order_id" })
    order: Orders;
}

