import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "../../products/entities/products.entity";

@Entity({
    name: 'CATEGORIES',
})
export class Categories {
    /**
     * @description Id único de cada categoría y debe ser de tipo UUID. 
     * @example "b3e37112-6896-4d02-a75c-812cdc2ad3f1"
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * @description Nombre de cada categoría y debe ser de tipo STRING. 
     * @example "smartphone"
    */
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    /**
        * Lista de productos relacionados con esta categoría.
        * Cada producto pertenece a una sola categoría.
    */
    @OneToMany(() => Products, (product) => product.category)
    @JoinColumn()
    products: Products[];
}