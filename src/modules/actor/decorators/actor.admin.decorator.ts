import { applyDecorators, UseGuards } from '@nestjs/common';
import { ActorPutToRequestGuard } from '../guards/actor.put-to-request.guards';
import { ActorNotFoundGuard } from '../guards/actor.not-found.guards';

export function ActorGetGuard(): any {
    return applyDecorators(
        UseGuards(ActorPutToRequestGuard, ActorNotFoundGuard)
    );
}

export function ActorDeleteGuard(): any {
    return applyDecorators(
        UseGuards(ActorPutToRequestGuard, ActorNotFoundGuard)
    );
}

export function ActorUpdateGuard(): any {
    return applyDecorators(
        UseGuards(ActorPutToRequestGuard, ActorNotFoundGuard)
    );
}
