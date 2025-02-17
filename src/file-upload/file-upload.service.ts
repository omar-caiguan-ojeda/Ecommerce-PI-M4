import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
    ) {}

    async uploadImage(file: Express.Multer.File, productId: string): Promise<Products> {
        if (!file) {
            throw new BadRequestException('Se requiere el archivo.');
        }
        
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new NotFoundException(`'El producto con el ID: ${productId}, no existe.`);
        }
        
        const uploadImage = await this.fileUploadRepository.uploadImage(file);
        if (!uploadImage?.secure_url) {
            throw new BadRequestException('Falló la subida de la imagen.');
        }
        
        await this.productsRepository.update(product.id, {
            imgUrl: uploadImage.secure_url,
        });
        
        return this.productsRepository.findOneBy({ id: productId });
    }
}
