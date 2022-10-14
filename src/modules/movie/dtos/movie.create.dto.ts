import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsGenre } from '../validator/is-genre.validation';

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

    // @IsNotEmpty()
    // @Type((v) => {
    //     return Date;
    // })
    // @Transform((x) => new Date(x.value))
    // @IsDate()
    // releaseDate: Date;
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
