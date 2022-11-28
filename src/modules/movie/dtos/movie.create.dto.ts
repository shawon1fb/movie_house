import {
    ArrayNotEmpty,
    IsArray,
    IsDate,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { IsGenre } from '../validator/is-genre.validation';
import { Transform } from 'class-transformer';
import {
    HasMimeType,
    IsFile,
    MaxFileSize,
    MemoryStoredFile,
} from 'nestjs-form-data';

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

    @IsNotEmpty()
    @IsMongoId()
    director: string;

    @IsMongoId({ each: true })
    @IsArray()
    @IsNotEmpty()
    @ArrayNotEmpty()
    cast: string[];

    @IsMongoId({ each: true })
    @IsArray()
    @IsNotEmpty()
    @ArrayNotEmpty()
    writers: string[];

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

    @IsArray()
    @IsNotEmpty()
    tags: string[];

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    trailer: MemoryStoredFile;

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    poster: MemoryStoredFile;
}
