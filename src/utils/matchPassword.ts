import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({
    name: 'MatchPassword',
    async: false,
})
export class MatchPassword implements ValidatorConstraintInterface {
    validate(
        password: string, 
        args: ValidationArguments
    ): Promise<boolean> | boolean {
        if (password !== args.object[args.constraints[0]]) return false;
        return true;        
    }
    defaultMessage(){
        return 'Password do not match';
    }
}

// import {
//     registerDecorator,
//     ValidationArguments,
//     ValidationOptions,
//   } from 'class-validator';
  
//   export function Match(property: string, validationOptions?: ValidationOptions) {
//     return (object: object, propertyName: string) => {
//       registerDecorator({
//         name: 'Match',
//         target: object.constructor,
//         propertyName: propertyName,
//         options: validationOptions,
//         constraints: [property],
//         validator: {
//           validate(value: any, args: ValidationArguments) {
//             const [relatedPropertyName] = args.constraints;
//             const relatedValue = (args.object as any)[relatedPropertyName];
//             return value === relatedValue; // Check if values match
//           },
//           defaultMessage(args: ValidationArguments) {
//             const [relatedPropertyName] = args.constraints;
//             return `${args.property} must match ${relatedPropertyName}`;
//           },
//         },
//       });
//     };
//   }
  

// import {
//     registerDecorator,
//     ValidationArguments,
//     ValidationOptions,
//   } from 'class-validator';
  
//   export function Match(property: string, validationOptions?: ValidationOptions) {
//     return (object: object, propertyName: string) => {
//       registerDecorator({
//         name: 'Match',
//         target: object.constructor,
//         propertyName: propertyName,
//         options: validationOptions,
//         constraints: [property],
//         validator: {
//           validate(value: any, args: ValidationArguments) {
//             const [relatedPropertyName] = args.constraints;
//             const relatedValue = (args.object as any)[relatedPropertyName];
//             return value === relatedValue; // Check if values match
//           },
//           defaultMessage(args: ValidationArguments) {
//             const [relatedPropertyName] = args.constraints;
//             return `${args.property} must match ${relatedPropertyName}`;
//           },
//         },
//       });
//     };
//   }
  