import {
    IsEnum,
    IsNotEmpty,
    IsString,
    ValidationArguments,
} from 'class-validator';

export enum GENDER_ENUM {
    MALE = 'male',
    FEMALE = 'female',
}

export class CreateActorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    about: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(GENDER_ENUM, {
        message: 'ok',
    })
    gender: string;
}
