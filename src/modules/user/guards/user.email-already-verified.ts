import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';

@Injectable()
export class UserEmailAlreadyVerifiedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __user } = context.switchToHttp().getRequest();

        if (!__user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        if (__user.isEmailVerified == true) {
            throw new NotFoundException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_ALREADY_VERIFIED,
                message: 'user.error.emailAlreadyVerified',
            });
        }

        return true;
    }
}
