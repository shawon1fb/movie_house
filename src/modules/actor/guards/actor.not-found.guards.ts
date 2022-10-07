import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ENUM_ACTOR_STATUS_CODE_ERROR } from '../constans/actor.status-code.constant';

@Injectable()
export class ActorNotFoundGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { __actor } = context.switchToHttp().getRequest();

        if (!__actor) {
            throw new NotFoundException({
                statusCode: ENUM_ACTOR_STATUS_CODE_ERROR.ACTOR_NOT_FOUND_ERROR,
                message: 'actor.error.notFound',
            });
        }

        return true;
    }
}
