import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../../common/database/constants/database.constant';
import {
    MovieDatabaseName,
    MovieEntity,
    MovieSchema,
} from './schemas/movie.schema';
import { IsGenreConstraint } from './validator/is-genre.validation';
import { MovieService } from './services/movie.service';
import { MovieBulkService } from './services/movie.bulk.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: MovieEntity.name,
                    schema: MovieSchema,
                    collection: MovieDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [MovieService, MovieBulkService],
    providers: [MovieService, MovieBulkService],
})
export class MovieModule {}
