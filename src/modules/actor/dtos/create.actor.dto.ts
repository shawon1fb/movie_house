import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    about: string;

    @IsEnum(['male', 'female'], {
        message: 'match with enum male, female',
        always: true,
    })
    @IsString()
    @IsNotEmpty()
    gender: string;
}
