import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isUUID(value, '4')) {
      throw new BadRequestException('El ID proporcionado no es un UUID válido.');
    }
    return value; 
  }
}
