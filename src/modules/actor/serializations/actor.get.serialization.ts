import { Exclude, Type } from 'class-transformer';
import { IAwsS3 } from '../../../common/aws/aws.interface';

export class ActorGetSerialization {
    // @Type(() => String)
    // readonly _id: string;

    readonly name: string;
    readonly about: string;
    readonly gender: string;
    readonly photo?: IAwsS3;

    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
