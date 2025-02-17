import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProductsDto {
    @ApiPropertyOptional({ description: 'Número de página', example: 1, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'El número de página debe ser un entero válido.' })
    @Min(1, { message: 'El número de página debe ser mayor o igual a 1.' })
    page: number = 1;

    @ApiPropertyOptional({ description: 'Cantidad de productos por página', example: 6, default: 6 })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: 'El límite debe ser un entero válido.' })
    @Min(1, { message: 'El límite debe ser mayor o igual a 1.' })
    limit: number = 6;
}
