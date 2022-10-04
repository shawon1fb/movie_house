import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { ActorDocument, ActorEntity } from '../schemas/actor.schema';
import { Model } from 'mongoose';
import { DeleteResult } from 'mongodb';

@Injectable()
export class ActorBulkService {
    constructor(
        @DatabaseEntity(ActorEntity.name)
        private readonly actorModel: Model<ActorDocument>
    ) {}

    async deleteMany(find: Record<string, any>): Promise<DeleteResult> {
        return this.actorModel.deleteMany(find);
    }
}
