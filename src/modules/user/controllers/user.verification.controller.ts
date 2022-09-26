import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../../common/auth/services/auth.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { UserService } from '../services/user.service';
import { RoleService } from '../../role/services/role.service';
import { EmailVerificationService } from '../services/email.verification.service';
import { Response } from '../../../common/response/decorators/response.decorator';
import { AuthJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { GetUser } from '../decorators/user.decorator';
import { IUserDocument } from '../user.interface';
import { IResponse } from '../../../common/response/response.interface';
import { UserEmailAlreadyVerifiedGuard } from '../guards/user.email-already-verified';
import { UserOtpDto } from '../dtos/user.otp.dto';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserGetSerialization } from '../serializations/user.get.serialization';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EmailOtpSendDto } from '../dtos/email.otp.send.dto';
import { SEND_EMAIL_OTP } from '../constants/user.events.constant';
import { UserPayloadPutToRequestGuard } from '../guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';

@Controller({
    version: '1',
    path: '/user',
})
export class UserVerificationController {
    constructor(
        private readonly authService: AuthService,
        private readonly paginationService: PaginationService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly emailVerificationService: EmailVerificationService,
        private eventEmitter: EventEmitter2
    ) {}

    @Response('user.verifyEmail', {
        classSerialization: UserGetSerialization,
    })
    @UseGuards(
        UserPayloadPutToRequestGuard,
        UserNotFoundGuard,
        UserEmailAlreadyVerifiedGuard
    )
    @AuthJwtGuard()
    @Post('/verify-email')
    async verifyEmail(
        @GetUser() user: IUserDocument,
        @Body() dto: UserOtpDto
    ): Promise<IResponse> {
        const check: boolean =
            await this.emailVerificationService.checkVerificationToken(
                user._id,
                dto.otp
            );
        if (check === false) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.INVALID_OTP,
                message: 'user.error.otpInvalid',
            });
        } else {
            await this.emailVerificationService.setUserEmailVerified(user._id);
        }

        return {
            ...user,
        };
    }

    @Response('user.resendEmailVerificationToken', {
        classSerialization: UserGetSerialization,
    })
    @UseGuards(
        UserPayloadPutToRequestGuard,
        UserNotFoundGuard,
        UserEmailAlreadyVerifiedGuard
    )
    @AuthJwtGuard()
    @Get('/resend-email-verification-token')
    async resendEmailVerificationToken(@GetUser() user: IUserDocument) {
        const otp: number =
            await this.emailVerificationService.createAndSaveValidationToken(
                user._id
            );
        this.eventEmitter.emit(SEND_EMAIL_OTP, {
            email: user.email,
            otp: otp,
        });
        return user;
    }

    @OnEvent(SEND_EMAIL_OTP, { async: true })
    async handleOrderCreatedEvent(payload: EmailOtpSendDto) {
        console.log(payload);
        return this.emailVerificationService.sendEmail(
            payload.email,
            payload.otp
        );
    }
}
