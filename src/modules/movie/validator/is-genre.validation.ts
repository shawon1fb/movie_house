import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { genres } from '../constant/genres.list.constant';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsGenreConstraint implements ValidatorConstraintInterface {
    validate(value: string[]): boolean {
        let b = true;
        for (let i = 0; i < value.length; i++) {
            const temp = genres.some((g) => g === value[i]);

            if (temp === false) {
                b = false;
                break;
            }
        }

        return value ? b : false;
    }
}

export function IsGenre(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string): any {
        registerDecorator({
            name: 'IsGenre',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsGenreConstraint,
        });
    };
}
