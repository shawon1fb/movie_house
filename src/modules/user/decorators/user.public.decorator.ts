import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserPayloadPutToRequestGuard } from '../guards/payload/user.payload.put-to-request.guard';
import { UserNotFoundGuard } from '../guards/user.not-found.guard';
import { UserEmailNotVerifiedGuard } from '../guards/user.email-not-verified';

export function UserProfileGuard(): any {
    return applyDecorators(
        UseGuards(
            UserPayloadPutToRequestGuard,
            UserNotFoundGuard,
            UserEmailNotVerifiedGuard
        )
    );
}
