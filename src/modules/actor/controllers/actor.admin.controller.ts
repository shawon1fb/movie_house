import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    UploadedFile,
} from '@nestjs/common';
import { CreateActorDto } from '../dtos/create.actor.dto';
import { Response } from '../../../common/response/decorators/response.decorator';
import { AuthAdminJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { ENUM_AUTH_PERMISSIONS } from '../../../common/auth/constants/auth.enum.permission.constant';
import { FileRequiredPipe } from '../../../common/file/pipes/file.required.pipe';
import { FileSizeImagePipe } from '../../../common/file/pipes/file.size.pipe';
import { FileTypeImagePipe } from '../../../common/file/pipes/file.type.pipe';
import { IFile } from '../../../common/file/file.interface';
import { UploadFileSingle } from '../../../common/file/decorators/file.decorator';
import { ActorService } from '../services/actor.service';
import { ENUM_ACTOR_STATUS_CODE_ERROR } from '../constans/actor.status-code.constant';
import { IAwsS3 } from '../../../common/aws/aws.interface';
import { AwsS3Service } from '../../../common/aws/services/aws.s3.service';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';
import { IResponse } from '../../../common/response/response.interface';
import { ActorGetSerialization } from '../serializations/actor.get.serialization';
import { IActorDocument } from '../actor.interface';

@Controller({
    version: '1',
    path: '/actor',
})
export class ActorAdminController {
    constructor(
        private readonly actorService: ActorService,
        private readonly awsService: AwsS3Service
    ) {}

    @Response('actor.create', { classSerialization: ActorGetSerialization })
    @UploadFileSingle('file')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ACTOR_READ,
        ENUM_AUTH_PERMISSIONS.ACTOR_CREATE
    )
    @Post('/create')
    async create(
        @Body() dto: CreateActorDto,
        @UploadedFile(FileRequiredPipe, FileSizeImagePipe, FileTypeImagePipe)
        file: IFile
    ): Promise<IResponse> {
        const filename: string = file.originalname;
        const content: Buffer = file.buffer;
        const mime: string = filename
            .substring(filename.lastIndexOf('.') + 1, filename.length)
            .toUpperCase();
        const path = await this.actorService.createRandomFilename();
        const exist: boolean = await this.actorService.exists(dto.name);

        if (exist === true) {
            throw new BadRequestException({
                statusCode: ENUM_ACTOR_STATUS_CODE_ERROR.ACTOR_EXIST_ERROR,
                message: 'actor.error.exist',
            });
        }

        try {
            const aws: IAwsS3 = await this.awsService.putItemInBucket(
                `${path.filename}.${mime}`,
                content,
                {
                    path: `${path.path}/${dto.name}`,
                }
            );

            const actor: IActorDocument = await this.actorService.create(
                dto,
                aws
            );
            return actor;
        } catch (err) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }
}
