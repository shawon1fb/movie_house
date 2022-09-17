import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { Model } from 'mongoose';
import {
    EmailVerificationDocument,
    EmailVerificationEntity,
} from '../schemas/email.verification.token.schema';
import { HelperNumberService } from '../../../common/helper/services/helper.number.service';
import { UserEntity } from '../schemas/user.schema';
import { HelperHashService } from '../../../common/helper/services/helper.hash.service';

@Injectable()
export class EmailVerificationService {
    constructor(
        @DatabaseEntity(EmailVerificationEntity.name)
        private readonly verificationModel: Model<EmailVerificationDocument>,
        private readonly helperNumberService: HelperNumberService,
        private readonly helperHashService: HelperHashService
    ) {}

    async createAndSaveValidationToken(user: UserEntity): Promise<number> {
        try {
            const randomOtp: number = this.helperNumberService.random(6);
            const salt: string = this.helperHashService.randomSalt(8);
            const otpHash: string = this.helperHashService.bcrypt(
                randomOtp.toString(),
                salt
            );
            const emailVerification: EmailVerificationEntity = {
                token: otpHash,
                owner: user,
                createAt: new Date(),
            };
            const create: EmailVerificationDocument =
                new this.verificationModel(emailVerification);
            await create.save();
            console.log({ randomOtp });
            return randomOtp;
        } catch (e) {
            throw e;
        }
    }

    async checkVerificationToken(user: string, otp: string): Promise<boolean> {
        try {
            const email = await this.verificationModel.findOne({
                owner: user,
            });
            if (!email) {
                return false;
            }
            return this.helperHashService.bcryptCompare(otp, email.token);
        } catch (e) {
            return false;
        }
    }
}
