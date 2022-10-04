import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import { ActorDocument, ActorEntity } from '../schemas/actor.schema';

@Injectable()
export class ActorService {
    constructor(
        @DatabaseEntity(ActorEntity.name)
        private readonly actorModel: Model<ActorDocument>
    ) {}
}
