import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { Model, Types } from 'mongoose';
import { ActorDocument, ActorEntity } from '../schemas/actor.schema';
import { HelperStringService } from '../../../common/helper/services/helper.string.service';
import { ConfigService } from '@nestjs/config';
import { CreateActorDto } from '../dtos/create.actor.dto';
import { IAwsS3 } from '../../../common/aws/aws.interface';
import { IActorDocument } from '../actor.interface';

@Injectable()
export class ActorService {
    private readonly uploadPath: string;

    constructor(
        @DatabaseEntity(ActorEntity.name)
        private readonly actorModel: Model<ActorDocument>,
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService
    ) {
        this.uploadPath = this.configService.get<string>('actor.uploadPath');
    }

    async createRandomFilename(): Promise<Record<string, any>> {
        const filename: string = this.helperStringService.random(20);

        return {
            path: this.uploadPath,
            filename: filename,
        };
    }

    async exists(name: string, _id?: string): Promise<boolean> {
        const exist = await this.actorModel.exists({
            name: {
                $regex: new RegExp(name),
                $options: 'i',
            },
            _id: { $nin: new Types.ObjectId(_id) },
        });

        return exist ? true : false;
    }

    async create(dto: CreateActorDto, aws: IAwsS3): Promise<IActorDocument> {
        const { name, about, gender } = dto;

        const actor: ActorEntity = {
            name,
            about,
            gender,
            photo: aws,
        };

        const create: ActorDocument = new this.actorModel(actor);
        const saved = await create.save();
        return {
            name: saved.name,
            about: saved.about,
            gender: saved.gender,
            photo: aws,
            _id: saved._id,
        };
    }

    async findOneById<T>(_id: string): Promise<T> {
        const user = this.actorModel.findById(_id);

        return user.lean();
    }
}
