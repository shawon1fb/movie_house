import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ActorRequestDto {
    @IsNotEmpty()
    @IsMongoId()
    @Type(() => String)
    actor: string;
}
