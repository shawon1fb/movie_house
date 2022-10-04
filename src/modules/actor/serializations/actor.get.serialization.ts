import { Exclude, Type } from 'class-transformer';

export class ActorGetSerialization {
    @Type(() => String)
    readonly _id: string;

    readonly name: string;
    readonly about: string;
    readonly gender: string;

    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
