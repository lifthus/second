import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsBigInt(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsBigInt',
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `${propertyName} must be a bigint instance`,
        ...validationOptions,
      },
      validator: {
        validate(
          value: any,
          validationArguments: ValidationArguments,
        ): boolean {
          return typeof value === 'bigint';
        },
      },
    });
  };
}
