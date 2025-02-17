import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
    /**
     * @description * Es el nombre del producto. De tipo String. Es opcional. 
     * @example 'Samsung Galaxy S24 Ultra 5G'
     */
    @IsOptional()
    @IsString({message: 'Nombre no válido, ingrese un texto.'})
    name: string

    /**
     * @description * Descripción del producto. De tipo String. Es opcional.
     * @example 'The best smartphone in the world'
     */
    @IsOptional()
    @IsString({message: 'Descripción no válida, ingrese un texto.'})
    description: string

    /**
     * @description * Precio del producto. De tipo Number que puede contener 2 decimales. Es opcional.
     * @example 599.99
     */
    @IsOptional()
    @IsNumber({maxDecimalPlaces: 2}, {message: 'Precio no válido.'})
    price: number

    /**
     * @description * Es el stock del producto. De tipo Number entero. Es opcional. 
     * @example 15
     */
    @IsOptional()
    @IsNumber({maxDecimalPlaces: 0}, {message: 'Cantidad no válida, debe ser un número entero.'})
    stock: number

    /**
     * @description * Direcion URL de una imagen descriptiba del producto. De tipo String. Es opcional. 
     * @example 'texto'
     */
    @IsOptional()
    @IsString({message: 'La ruta de imgUrl debe ser una cadena de texto.'})
    imgUrl: string

    /**
     * @description * El el Id de la categoría a la que pertenece el producto. Es de tipo UUID válido. Es opcional. 
     * @example "c6e0aec9-82be-4dde-9fb9-729ad4e6b06f"
     */
    @IsOptional()
    @IsUUID('4', {message: 'La categoria debe contener un UUID válido'})
    categoryId: string   
}
