import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    /**
     * @description Nombre de cada categoría y debe ser de tipo STRING. 
     * @example 'motherboard'
    */
    @IsNotEmpty({message: 'El campo NAME de la categoría no puede ir vacío'})
    @IsString({ message: 'El campo de NAME debe contener caracteres válidos a una cadena de texto.' })
    name: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    /**
     * @description Nombre de cada categoría y debe ser de tipo STRING.
     * @example 'video-card'
    */
    @IsNotEmpty({ message: 'El campo NAME de la categoría no puede ir vacío' })
    @IsString({ message: 'El campo de NAME debe contener caracteres válidos a una cadena de texto.' })
    name: string;
}