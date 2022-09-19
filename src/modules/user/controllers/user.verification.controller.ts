import {
    Body,
    Controller,
    ForbiddenException,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../../common/auth/services/auth.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { UserService } from '../services/user.service';
import { RoleService } from '../../role/services/role.service';
import { EmailVerificationService } from '../services/email.verification.service';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';
import { UserProfileGuard } from '../decorators/user.public.decorator';
import { AuthJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { GetUser } from '../decorators/user.decorator';
import { IUserDocument } from '../user.interface';
import { IResponse } from '../../../common/response/response.interface';
import { UserEmailAlreadyVerifiedGuard } from '../guards/user.email-already-verified';
import { UserOtpDto } from '../dtos/user.otp.dto';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';

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
        private readonly emailVerificationService: EmailVerificationService
    ) {}

    @Response('user.verifyEmail', {
        classSerialization: UserProfileSerialization,
    })
    @UseGuards(UserEmailAlreadyVerifiedGuard)
    @UserProfileGuard()
    @AuthJwtGuard()
    @Post('/verify-email')
    async profile(
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
            user,
            dto,
            check,
        };
    }
}
