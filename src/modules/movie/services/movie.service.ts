import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { Model, Types } from 'mongoose';
import { HelperStringService } from '../../../common/helper/services/helper.string.service';
import { ConfigService } from '@nestjs/config';
import { MovieDocument, MovieEntity } from '../schemas/movie.schema';
import { Injectable } from '@nestjs/common';
import { MovieCreateDto } from '../dtos/movie.create.dto';
import { IAwsS3 } from '../../../common/aws/aws.interface';

@Injectable()
export class MovieService {
    private readonly uploadPath: string;

    constructor(
        @DatabaseEntity(MovieEntity.name)
        private readonly movieModel: Model<MovieDocument>,
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService
    ) {
        this.uploadPath = this.configService.get<string>('movie.uploadPath');
    }

    async createRandomFilename(): Promise<Record<string, any>> {
        const filename: string = this.helperStringService.random(20);

        return {
            path: this.uploadPath,
            filename: filename,
        };
    }

    async exists(name: string, _id?: string): Promise<boolean> {
        const exist = await this.movieModel.exists({
            title: {
                $regex: new RegExp(name),
                $options: 'i',
            },
            _id: { $nin: new Types.ObjectId(_id) },
        });

        return exist ? true : false;
    }

    async create(dto: MovieCreateDto, trailer: IAwsS3, poster: IAwsS3) {
        const {
            genres,
            title,
            storyLine,
            language,
            type,
            releaseDate,
            status,
            director,
            writers,
            cast,
            tags,
        } = dto;

        const movie: MovieEntity = {
            title,
            storyLine,
            language,
            releaseDate,
            status,
            type,
            genres,
            trailer,
            poster,
            director: new Types.ObjectId(director),
            writers: writers.map((val) => new Types.ObjectId(val)),
            cast: cast.map((val) => new Types.ObjectId(val)),
            tags,
        };
        const create: MovieDocument = new this.movieModel(movie);
        const saved = await create.save();
        return {
            title: saved.title,
        };
    }
}
