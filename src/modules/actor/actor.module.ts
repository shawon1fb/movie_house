import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DATABASE_CONNECTION_NAME } from '../../common/database/constants/database.constant';
import {
    ActorDatabaseName,
    ActorEntity,
    ActorSchema,
} from './schemas/actor.schema';
import { ActorBulkService } from './services/actor.bulk.service';
import { ActorService } from './services/actor.service';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: ActorEntity.name,
                    schema: ActorSchema,
                    collection: ActorDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    providers: [ActorBulkService, ActorService],
    exports: [ActorBulkService, ActorService],
})
export class ActorModule {}
