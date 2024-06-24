import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNameConstraint implements ValidatorConstraintInterface {
  validate(name: string) {
    const regex = /^([A-Z][a-z]*\s)*[A-Z][a-z]*$/;
    return regex.test(name);
  }

  defaultMessage() {
    return 'Name ($value) is not a valid name!';
  }
}

export function IsName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameConstraint,
    });
  };
}
