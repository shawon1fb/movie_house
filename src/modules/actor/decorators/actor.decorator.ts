import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRoleDocument } from '../../role/role.interface';

export const GetActor = createParamDecorator(
    (data: string, ctx: ExecutionContext): IRoleDocument => {
        const { __actor } = ctx.switchToHttp().getRequest();
        return __actor;
    }
);
