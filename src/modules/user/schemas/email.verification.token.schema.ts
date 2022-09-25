import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserEntity } from './user.schema';

@Schema({ timestamps: true, versionKey: false, expires: '30s' })
export class EmailVerificationEntity {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: UserEntity.name,
        unique: true,
    })
    owner: Types.ObjectId;

    @Prop({
        required: true,
    })
    token: string;

    @Prop({
        expires: 30,
        default: Date.now(),
    })
    createAt: Date;
}

export const EmailVerificationDatabaseName = 'email_verification';
export const EmailVerificationSchema = SchemaFactory.createForClass(
    EmailVerificationEntity
);

export type EmailVerificationDocument = EmailVerificationEntity & Document;

// Hooks
EmailVerificationSchema.pre<EmailVerificationDocument>('save', function (next) {
    next();
});
