import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator"

export class CreateProductDto {
    /**
     * @description * Es el nombre de cada producto. De tipo STRING y obligatorio. 
     * @example 'Xiaomi Redmi Note 13 PRO 5G'
     */
    @IsNotEmpty({message: 'El nombre del producto es obligatorio.'})
    @IsString({message: 'Nombre no válido, ingrese un texto.'})
    name: string

    /**
     * @description * Es la descripción del producto. De tipo STRING y obligatorio. 
     * @example 'The best smartphone in the world'
     */
    @IsNotEmpty({message: 'La descripción del producto es obligatoria.'})
    @IsString({message: 'Descripción no válida, ingrese un texto.'})
    description: string

    /**
     * @description * Precio del producto. De tipo NUMBER que puede contener hasta dos decimales y es obligatorio. 
     * @example 259.99
     */
    @IsNotEmpty({message: 'El precio del producto es obligatorio.'})
    @IsNumber({maxDecimalPlaces: 2}, {message: 'Precio no válido.'})
    price: number

    /**
     * @description * Es el Stock del producto. De tipo número entero y es obligatorio. 
     * @example 15
     */
    @IsNotEmpty({message: 'La cantidad o stock no puede ir vacía.'})
    @IsNumber({maxDecimalPlaces: 0}, {message: 'Cantidad no válida, debe ser un número entero.'})
    stock: number

    /**
     * @description * El la direcion de URL de la imagen descripcion del producto. De tipo String y obligatorio.
     * @example 'texto'
     */
    @IsNotEmpty({message: 'El campo imgUrl del producto es obligatorio.'})
    @IsString({message: 'La ruta de imgUrl debe ser una cadena de texto.'})
    imgUrl: string

    /**
     * @description Es el Id de la categoria a la que pertenece el producto y es de tipo UUID válido y obligatoria. 
     * @example "c6e0aec9-82be-4dde-9fb9-729ad4e6b06f"
     */
    @IsNotEmpty({message: 'La categoría es obligatoria.'})
    @IsUUID('4', {message: 'La categoria debe contener un UUID válido'})
    categoryId: string   
}