import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import {
    UserDatabaseName,
    UserEntity,
    UserSchema,
} from './schemas/user.schema';
import { UserBulkService } from './services/user.bulk.service';
import { UserService } from './services/user.service';
import {
    EmailVerificationDatabaseName,
    EmailVerificationEntity,
    EmailVerificationSchema,
} from './schemas/email.verification.token.schema';
import { EmailVerificationService } from './services/email.verification.service';
import { UserVerificationController } from './controllers/user.verification.controller';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: UserEntity.name,
                    schema: UserSchema,
                    collection: UserDatabaseName,
                },
                {
                    name: EmailVerificationEntity.name,
                    schema: EmailVerificationSchema,
                    collection: EmailVerificationDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [UserService, UserBulkService, EmailVerificationService],
    providers: [UserService, UserBulkService, EmailVerificationService],
    controllers: [],
})
export class UserModule {}
