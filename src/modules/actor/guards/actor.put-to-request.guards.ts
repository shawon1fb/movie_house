import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ActorService } from '../services/actor.service';
import { IActorDocument } from '../actor.interface';

@Injectable()
export class ActorPutToRequestGuard implements CanActivate {
    constructor(private readonly actorService: ActorService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { params } = request;
        const { actor } = params;
        const check: IActorDocument =
            await this.actorService.findOneById<IActorDocument>(actor);
        request.__actor = check;

        return true;
    }
}
