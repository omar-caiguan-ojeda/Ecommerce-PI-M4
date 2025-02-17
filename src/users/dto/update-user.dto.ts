import { IsString, IsEmail, Length, Matches, IsOptional, IsNumber, ValidateIf, Validate } from "class-validator";
import { MatchPassword } from "../../utils/matchPassword";

export class UpdateUserDto {
  /**
    * @description * Es el "email" quiere actualizar el usuario. Es de tipo String y opcional. 
    * @example 'omar@gmail.com'
  */
  @IsOptional()
  @IsEmail({}, { message: 'El campo Email debe tener un formato de correo electrónico válido: ejemplo@ejemplo.com.' })
  email?: string;

  /**
    * @description * Nombre que quiere actualizar el usuario. Es de tipo String, debe tener una longuitud de 3 a 80 carateres y es opcional. 
    * @example 'Omar'
  */
  @IsOptional()
  @IsString({ message: 'El campo de Nombre debe contener caracteres válidos a una cadena de texto.' })
  @Length(3, 80, { message: 'El Nombre ingresado debe contener una longuitud de 3 a 80 carateres.' })
  name?: string;

  /**
    * @description * Password que quiere actualizar el usuario. Debe ser un String. Como requisitos debe incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) como mínimo y tener una loguitud de 8 y 15 caracteres. Es campo opcional.
    * @example 'Password@12345'
  */
  @IsOptional()
  @IsString({ message: 'El campo Contraseña debe contener caracteres válidos a una cadena de texto.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'La contraseña ingresada debe incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) como mínimo y tener una longitud de 8 y 15 caracteres.' }
  )
  password?: string;

  /**
    * @description * Aqui se confirma el "password" del usuario que quiere actualizarse. Es de tipo String. Debe coincidir con el "password" anterior. Es obligatorio solo cuando se actualiza el Password, sino es opcional. 
    * @example 'Password@12345'
  */
  @ValidateIf((o) => o.password !== undefined) // Validar si `password` es enviado
  @IsString({ message: 'El campo Confirmar Contraseña debe contener caracteres válidos a una cadena de texto.' })
  @Validate(MatchPassword, ['password'], {
    message: 'Las contraseñas ingresadas deben coincidir.',
  })
  confirmPassword?: string;

  /**
    * @description * Domicilio del usuario que quiere actualizarse. Es de tipo String y debe tener una longuitud de 3 a 80 carateres. Es opcional.
    * @example 'Paraná 1760'
  */
  @IsOptional()
  @IsString({ message: 'El campo Domicilio debe contener caracteres válidos a una cadena de texto.' })
  @Length(3, 80, { message: 'El Domicilio ingresado debe contener una longuitud 3 a 80 carateres.' })
  address?: string;

  /**
    * @description * Teléfono del usuario que quiere actualizarse. Es de tipo Number entero. Es opcional. 
    * @example 987654321
  */
  @IsOptional()
  @IsNumber({}, { message: 'El campo Teléfono debe contener caracteres válidos a un número.' })
  phone?: number;

  /**
    * @description * País del usuario que quiere actualizarse. Es de tipo String y debe tener una longuitud de 5 a 20 caracteres. Es un campo opcional.
    * @example 'Chile'
  */
  @IsOptional()
  @IsString({ message: 'El campo País debe contener un caracteres válidos a una cadena de texto.' })
  @Length(5, 20, { message: 'El País ingresado debe contener una loguitud de 5 a 20 carateres.' })
  country?: string;

  /**
    * @description * Ciudad del usuario que quiere actualizarse. Es de tipo String y debe tener una longuitud de 5 a 20 caracteres. Es un campo opcional.
    * @example 'Entre Lagos'
  */
  @IsOptional()
  @IsString({ message: 'El campo Ciudad debe contener un caracteres válidos a una cadena de texto.' })
  @Length(5, 20, { message: 'La Ciudad ingresada debe contener una longuitud de 5 a 20 carateres.' })
  city?: string;
}
