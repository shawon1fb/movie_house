import { Controller, Get, Query } from '@nestjs/common';
import {
    Response,
    ResponsePaging,
} from '../../../common/response/decorators/response.decorator';
import { ActorGetSerialization } from '../serializations/actor.get.serialization';
import { RequestParamGuard } from '../../../common/request/decorators/request.decorator';
import {
    IResponse,
    IResponsePaging,
} from '../../../common/response/response.interface';
import { GetActor } from '../decorators/actor.decorator';
import { IActorDocument } from '../actor.interface';
import { ActorRequestDto } from '../dtos/actor.request.dto';
import { ActorGetGuard } from '../decorators/actor.admin.decorator';
import { AuthJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { ENUM_AUTH_PERMISSIONS } from '../../../common/auth/constants/auth.enum.permission.constant';
import { ActorService } from '../services/actor.service';
import { PaginationService } from '../../../common/pagination/services/pagination.service';
import { ActorListDto } from '../dtos/actor.list.dto';

@Controller({
    version: '1',
    path: '/actor',
})
export class ActorUserController {
    constructor(
        private readonly actorService: ActorService,
        private readonly paginationService: PaginationService
    ) {}

    @Response('actor.get', { classSerialization: ActorGetSerialization })
    @ActorGetGuard()
    @RequestParamGuard(ActorRequestDto)
    @AuthJwtGuard(ENUM_AUTH_PERMISSIONS.ACTOR_READ)
    @Get('/single/:actor')
    async getSingle(@GetActor() actor: IActorDocument): Promise<IResponse> {
        return actor;
    }

    @ResponsePaging('actor.list', { classSerialization: ActorGetSerialization })
    @AuthJwtGuard(ENUM_AUTH_PERMISSIONS.ACTOR_READ)
    @Get('/list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: ActorListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
        };

        const actors: IActorDocument[] = await this.actorService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.actorService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: actors,
        };
    }
}
