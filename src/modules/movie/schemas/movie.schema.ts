import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ActorEntity } from '../../actor/schemas/actor.schema';
import { genres } from '../constant/genres.list.constant';
import { IAwsS3 } from '../../../common/aws/aws.interface';

@Schema({ timestamps: true, versionKey: false })
export class MovieEntity {
    @Prop({
        required: true,
        trim: true,
    })
    title: string;

    @Prop({
        required: true,
        trim: true,
    })
    storyLine: string;
    @Prop({
        type: Types.ObjectId,
        ref: ActorEntity.name,
    })
    director: Types.ObjectId;

    @Prop({
        type: Date,
        required: true,
    })
    releaseDate: Date;

    @Prop({
        required: true,
        enum: ['public', 'private'],
    })
    status: string;

    @Prop({
        required: true,
    })
    type: string;
    @Prop({
        type: [String],
        required: true,
        enum: genres,
    })
    genres: string[];
    @Prop({
        type: [String],
        required: true,
    })
    tags: string[];

    @Prop({
        type: [Types.ObjectId],
        ref: ActorEntity.name,
    })
    cast: Types.ObjectId[];

    @Prop({
        type: [Types.ObjectId],
        ref: ActorEntity.name,
    })
    writers: Types.ObjectId[];

    @Prop({
        required: true,
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
    poster: IAwsS3;

    @Prop({
        required: true,
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
    trailer: IAwsS3;

    @Prop({
        required: true,
    })
    language: string;
}

export const MovieDatabaseName = 'movies';
export const MovieSchema = SchemaFactory.createForClass(MovieEntity);

export type MovieDocument = MovieEntity & Document;

// Hooks
MovieSchema.pre<MovieDocument>('save', function (next) {
    next();
});
