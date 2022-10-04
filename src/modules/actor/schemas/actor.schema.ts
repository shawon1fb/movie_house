import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAwsS3 } from '../../../common/aws/aws.interface';
import { GENDER_ENUM } from '../dtos/create.actor.dto';

@Schema({ timestamps: true, versionKey: false })
export class ActorEntity {
    @Prop({
        required: true,
        index: 'text',
        trim: true,
    })
    name: string;

    @Prop({
        required: true,
        lowercase: true,
        trim: true,
        enum: GENDER_ENUM,
    })
    gender: string;

    @Prop({
        required: true,
        trim: true,
    })
    about: string;

    @Prop({
        required: false,
        _id: false,
        type: {
            path: String,
            pathWithFilename: String,
            filename: String,
            completedUrl: String,
            baseUrl: String,
            mime: String,
        },
    })
    photo?: IAwsS3;
}

export const ActorDatabaseName = 'actors';
export const ActorSchema = SchemaFactory.createForClass(ActorEntity);

export type ActorDocument = ActorEntity & Document;

// Hooks
ActorSchema.pre<ActorDocument>('save', function (next) {
    next();
});
