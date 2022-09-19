import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserEntity } from './user.schema';

@Schema({ timestamps: true, versionKey: false, expires: '60s' })
export class EmailVerificationEntity {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    owner: UserEntity;

    @Prop({
        required: true,
    })
    token: string;

    @Prop({
        // expires: 30,
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
