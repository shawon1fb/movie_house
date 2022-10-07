import { IAwsS3 } from '../../common/aws/aws.interface';

export interface IActorDocument {
    photo: IAwsS3;
    about: string;
    gender: string;
    name: string;
    _id: string;
}
