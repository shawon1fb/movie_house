import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
import { MovieDocument, MovieEntity } from '../schemas/movie.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieBulkService {
    constructor(
        @DatabaseEntity(MovieEntity.name)
        private readonly movieModel: Model<MovieDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return this.movieModel.deleteMany(find);
    }
}
