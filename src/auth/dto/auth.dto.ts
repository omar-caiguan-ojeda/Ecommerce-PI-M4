import { IsNotEmpty, IsEmail, IsString, Matches } from "class-validator";

export class UserLoginDto {

    /**
        * @description Es el "email" del usuario que quiere iniciar sesión. Es de tipo STRING y debe tener un formato de correo electrónico válido.
        * @example "leonardo@gmail.com"
    */
    @IsNotEmpty({ message: 'Debes ingresar tu dirección de correo.' })
    @IsEmail({}, { message: 'El campo Email debe tener un formato de correo electrónico válido: ejemplo@ejemplo.com.' })
    email: string;

    /**
        * @description Es el "password" del usuario que quiere iniciar sesión. Es de tipo STRING y debe incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) como mínimo y tener una longuitud de 8 a 15 caracteres. 
        * @example "Password@123"
    */
    @IsNotEmpty({ message: 'Debes ingresar tu contraseña.' })
    @IsString({ message: 'El campo Contraseña debe contener caracteres válidos a una cadena de texto.' })
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'La contraseña debe incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) como mínimo y tener una longuitud de 8 a 15 caracteres.' }
    )
    password: string;

}