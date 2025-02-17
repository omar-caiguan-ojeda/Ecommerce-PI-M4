import { IsNotEmpty, IsString, IsEmail, Length, Matches, IsNumber, Validate } from "class-validator";
import { MatchPassword } from "../../utils/matchPassword";


export class CreateUserDto {
    /**
     * @description Email del usuario que quiere registrarse. Es de tipo String y obligatorio. 
     * @example 'leonardo@gmail.com'
     */
    @IsNotEmpty({ message: 'Ingreesa el email' })
    @IsEmail({}, { message: 'El campo Email debe tener un formato de correo electrónico válido: ejemplo@ejemplo.com.' })
    email: string;
    
    /**
        * @description * Nombre del usuario que quiere registrarse. Es de tipo String, debe tener una longuitud de 3 a 80 carateres y es obligatorio. 
        * @example 'Leonardo'
    */
    @IsNotEmpty({ message: 'Ingresar tu nombre y apellido.' })
    @IsString({ message: 'El campo de Nombre debe contener caracteres válidos a una cadena de texto.' })
    @Length(3, 80, { message: 'El Nombre ingresado debe tener una longuitud de 3 a 80 carateres.' })
    name: string;

    /**
     * @description * Password del usuario que quiere registrarse. Debe ser un String. Como requisitos debe incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) como mínimo y tener una loguitud de 8 y 15 caracteres. Es campo obligatorio.
     * @example 'Password@123'
     */
    @IsNotEmpty({ message: 'Debes registrar una contraseña.' })
    @IsString({ message: 'El campo Contraseña debe contener caracteres válidos a una cadena de texto.' })
    @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/,
    { message: 'La contraseña ingresada debe incluir una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*) como mínimo y tener una loguitud de 8 y 15 caracteres.' }
    )
    password: string;

    /**
     * @description * Aqui se confirma el "password" del usuario que quiere registrarse. Es de tipo String. Debe coincidir con el "password" anterior y es obligatorio. 
     * @example 'Password@123'
     */
    @IsNotEmpty({message: 'Debes reingresar tu contraseña.'})
    @Validate(MatchPassword, ['password'], {message: 'Las contraseñas ingresadas deben coincidir.'})
    confirmPassword: string

    /**
        * @description * Domicilio del usuario que quiere registrarse. Es de tipo String y debe tener una longuitud de 3 a 80 carateres. Es obligatorio. 
        * @example 'Holdich 1380'
    */
    @IsNotEmpty({message: 'Debes ingresar tu Domicilio.'})
    @IsString({ message: 'El campo Domicilio debe contener caracteres válidos a una cadena de texto.' })
    @Length(3, 80, { message: 'El Domicilio ingresado debe contener una longuitud 3 a 80 carateres.' })
    address: string;

    /**
        * @description * Teléfono del usuario que quiere registrarse. Es de tipo Number entero. Es un campo obligatorio. 
        * @example 123456789
    */
    @IsNotEmpty({message: 'Debes ingresar un Número de Teléfono.'})
    @IsNumber({}, { message: 'El campo Teléfono debe contener caracteres válidos a un número.' })
    phone: number;

    /**
        * @description * País del usuario que quiere registrarse. Es de tipo String y debe tener una longuitud de 5 a 20 caracteres. Es un campo obligatorio. 
        * @example 'Argentina'
    */
    @IsNotEmpty({message: 'Ingresar el pais de residencia.'})
    @IsString({ message: 'El campo País debe contener un caracteres válidos a una cadena de texto.' })
    @Length(5, 20, { message: 'El País ingresado debe contener una loguitud de 5 a 20 carateres.' })
    country: string;

    /**
        * @description * Ciudad del usuario que quiere registrarse. Es de tipo String y debe tener una longuitud de 5 a 20 caracteres. Es un campo obligatorio.
        * @example 'Bahia Blanca'
    */
    @IsNotEmpty({message: 'Ingresar la ciudad de residencia.'})
    @IsString({ message: 'El campo Ciudad debe contener caracteres válidos a una cadena de texto.' })
    @Length(5, 20, { message: 'La Ciudad ingresada debe contener una longuitud de 5 a 20 carateres.' })
    city: string;
}