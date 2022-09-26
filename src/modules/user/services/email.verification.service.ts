import { Injectable } from '@nestjs/common';
import { DatabaseEntity } from '../../../common/database/decorators/database.decorator';
import { Model, Types } from 'mongoose';
import {
    EmailVerificationDocument,
    EmailVerificationEntity,
} from '../schemas/email.verification.token.schema';
import { HelperNumberService } from '../../../common/helper/services/helper.number.service';
import { UserDocument, UserEntity } from '../schemas/user.schema';
import { HelperHashService } from '../../../common/helper/services/helper.hash.service';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class EmailVerificationService {
    constructor(
        @DatabaseEntity(EmailVerificationEntity.name)
        private readonly verificationModel: Model<EmailVerificationDocument>,
        @DatabaseEntity(UserEntity.name)
        private readonly userModel: Model<UserDocument>,
        private readonly helperNumberService: HelperNumberService,
        private readonly helperHashService: HelperHashService,
        private readonly mailService: MailerService
    ) {}

    async createAndSaveValidationToken(user: Types.ObjectId): Promise<number> {
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
            await this.verificationModel.deleteMany({ owner: user });
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

    async setUserEmailVerified(user: string) {
        await this.userModel.findByIdAndUpdate(
            { _id: user },
            { isEmailVerified: true }
        );
    }

    async sendEmail(toEmail: string, otp: string): Promise<SentMessageInfo> {
        try {
            return await this.mailService.sendMail({
                to: toEmail,
                from: 'mail.shahanulshaheb.com',
                subject: 'Email verification OTP',
                text: 'your otp is ' + otp,
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}
