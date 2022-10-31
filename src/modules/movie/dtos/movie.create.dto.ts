import { IsArray, IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsGenre } from '../validator/is-genre.validation';
import { Transform } from 'class-transformer';

export class MovieCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    storyLine: string;

    @IsString()
    @IsNotEmpty()
    language: string;

    @IsNotEmpty()
    @Transform((x) => {
        const timestamp = +x.value;
        if (timestamp) {
            return new Date(timestamp);
        }
        return new Date(x.value);
    })
    @IsDate()
    releaseDate: Date;
    @IsString()
    @IsNotEmpty()
    @IsEnum(['public', 'private'])
    status: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsArray()
    @IsNotEmpty()
    @IsGenre()
    genres: string[];
}
