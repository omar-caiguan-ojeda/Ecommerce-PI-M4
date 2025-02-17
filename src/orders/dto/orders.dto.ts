import { IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  /**
    * @description Identificador único del producto incluido en la orden. Debe ser un UUID válido.
    * @example "b3e37112-6896-4d02-a75c-812cdc2ad3f1"
  */
  @IsNotEmpty({ message: 'El campo productId no debe estar vacío.' })
  @IsUUID('4', { message: 'El valor de productId debe ser un UUID válido.' })
  id: string;
}

export class CreateOrderDto {
  /**
    * @description Identificador único del usuario que realiza la orden de compra. Debe ser un UUID válido.
    * @example "871d5105-bd27-4784-ac30-00a390308b9e"
  */
  @ApiProperty({
    description: 'Identificador único del usuario que realiza la orden de compra. Debe ser un UUID válido.',
    example: '871d5105-bd27-4784-ac30-00a390308b9e',
  })
  @IsNotEmpty({ message: 'El campo de userId no debe ir vacío.' })
  @IsUUID('4', { message: 'El valor de userId debe ser un UUID válido.' })
  userId: string;

  /**
    * @description Lista de productos incluidos en la orden de compra. Debe ser un array con al menos un producto.
    * Cada producto debe cumplir con la estructura definida en el DTO `ProductDto`.
    * @example [{ id: "b3e37112-6896-4d02-a75c-812cdc2ad3f1" }]
  */
  @ApiProperty({
    description: 'Lista de productos incluidos en la orden de compra. Debe ser un array con al menos un producto.',
    example: [
      { 'id' : 'ec79d017-5d47-4399-a072-e922fbd033ae' }
    ],
  })
  @IsArray({ message: 'El campo de products debe ser un array.' })
  @ArrayMinSize(1, { message: 'La orden de compra debe incluir al menos un producto.' })
  @ValidateNested({ each: true })
  @Type(() => ProductDto) // Esto permite que NestJS valide cada elemento del array como ProductDto
  products: ProductDto[];
}


// "{ "userId": "871d5105-bd27-4784-ac30-00a390308b9e", "products": [{ "id": "ec79d017-5d47-4399-a072-e922fbd033ae" }] }"