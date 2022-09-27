import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateActorDto } from '../dtos/create.actor.dto';
import { Response } from '../../../common/response/decorators/response.decorator';
import { AuthAdminJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { ENUM_AUTH_PERMISSIONS } from '../../../common/auth/constants/auth.enum.permission.constant';

@Controller({
    version: '1',
    path: '/actor',
})
export class ActorAdminController {
    @Get('/hello')
    async hello() {
        return 'hello actor admin';
    }

    @Response('role.create')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ACTOR_READ,
        ENUM_AUTH_PERMISSIONS.ACTOR_CREATE
    )
    @Post('/create')
    async create(@Body() dto: CreateActorDto) {
        return dto;
    }

    @Get('/list')
    async list() {
        return 'list';
    }

    @Get('/single/:id')
    async getSingle() {
        return 'get single actor';
    }
}
