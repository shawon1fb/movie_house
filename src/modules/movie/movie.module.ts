import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '../../common/database/constants/database.constant';
import {
    MovieDatabaseName,
    MovieEntity,
    MovieSchema,
} from './schemas/movie.schema';

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
    exports: [],
    providers: [],
})
export class MovieModule {}
