import { Column, Entity, JoinColumn, ManyToMany, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../../categories/entities/categories.entity";
import { OrderDetails } from "../../orders/entities/orderDetails.entity";

/**
     * @description * Entidad de Productos. 
*/
@Entity({
    name: 'PRODUCTS',
})
export class Products {
    /**
     * @description * Id único de cada producto y debe ser de tipo UUID. Lo genera automaticamente la Base de Datos.  
     * @example "b3e37112-6896-4d02-a75c-812cdc2ad3f1"
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
        * @description * Nombre de cada producto. Es de tipo VARCHAR, debe tener una logitud de 50 caracteres, es único y obligatorio y no acepta valores nulos . 
        * @example 'Xiaomi Redmi Note 13 PRO 5G'
    */
    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    name: string;

    /**
        * @description * Descripción del producto. Es de tipo VARCHAR, con una logitud de 50 caracteres, Es un campo obligatorio y no acepta valores nulos. 
        * @example 'Xiaomi Redmi Note 13 PRO 5G'
    */
    @Column({ type: "text", nullable: false })
    description: string;

    /**
        * @description  * Precio del producto. 
        * Es un número decimal con un máximo de 10 dígitos, de los cuales 2 corresponden a los decimales. 
        * Este campo es obligatorio y no acepta valores nulos.   
        * @example '199.99'
    */
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    /**
        * @description  * Stock del producto. De tipo número entero. Es un campo obligatorio y no acepta valores nulos.
        * @example '15'
    */
    @Column({ type: "int", nullable: false })
    stock: number;
    
    /**
        * @description  * Direcion de URL de la imagen descripción del producto. De tipo String. Campo obligatorio y no acepta valores nulos.
        * @example 'texto'
    */
    @Column({ type: "text", nullable: false, default: "texto" })
    imgUrl: string;

    /**
        * Relación con la categoría del producto.
        * Este campo define a qué categoría pertenece el producto.
        * La relación es de muchos productos a una categoría.
        * Se carga automáticamente debido a la propiedad `eager: true`.
    */
    @ManyToOne(() => Categories, (category) => category.products, { eager: true })
    @JoinColumn({ name: "category_id" })
    category: Categories;

    /**
        * Relación con los detalles de pedido en los que aparece este producto.
        * Define una relación de muchos productos a muchos detalles de pedido.
    */
    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];

    /**
        * ID de la categoría a la que pertenece el producto.
        * Es un campo obligatorio y se almacena como texto en la base de datos.
        * Este campo se utiliza como clave foránea en la relación con la tabla de categorías.
        * @example "b3e37112-6896-4d02-a75c-812cdc2ad3f1"
    */
    @Column({ type: "text", nullable: false })
    category_id: string;
}