import { Controller, Get } from '@nestjs/common';
import { Response } from '../../../common/response/decorators/response.decorator';
import { ActorGetSerialization } from '../serializations/actor.get.serialization';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import { IResponse } from '../../../common/response/response.interface';
import { GetActor } from '../decorators/actor.decorator';
import { IActorDocument } from '../actor.interface';
import { ActorRequestDto } from '../dtos/actor.request.dto';
import { ActorGetGuard } from '../decorators/actor.admin.decorator';
import { AuthJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { ENUM_AUTH_PERMISSIONS } from '../../../common/auth/constants/auth.enum.permission.constant';

@Controller({
    version: '1',
    path: '/actor',
})
export class ActorUserController {
    @Response('actor.get', { classSerialization: ActorGetSerialization })
    @ActorGetGuard()
    @RequestParamGuard(ActorRequestDto)
    @AuthJwtGuard(ENUM_AUTH_PERMISSIONS.ACTOR_READ)
    @Get('/single/:actor')
    async getSingle(@GetActor() actor: IActorDocument): Promise<IResponse> {
        return actor;
    }
}
