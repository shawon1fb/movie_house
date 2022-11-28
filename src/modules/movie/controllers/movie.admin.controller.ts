import {
    BadRequestException,
    Body,
    Controller,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { MovieCreateDto } from '../dtos/movie.create.dto';
import { Response } from '../../../common/response/decorators/response.decorator';
import { AuthAdminJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { FormDataRequest } from 'nestjs-form-data';
import { AwsS3Service } from '../../../common/aws/services/aws.s3.service';
import { MovieService } from '../services/movie.service';
import { ENUM_ACTOR_STATUS_CODE_ERROR } from '../../actor/constant/actor.status-code.constant';
import { IAwsS3 } from '../../../common/aws/aws.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '../../../common/error/constants/error.status-code.constant';

@Controller({
    version: '1',
    path: '/movie',
})
export class MovieAdminController {
    constructor(
        private readonly movieService: MovieService,
        private readonly awsService: AwsS3Service
    ) {}

    @Response('movie.create')
    @FormDataRequest()
    @AuthAdminJwtGuard()
    @Post('/create')
    async create(@Body() dto: MovieCreateDto) {
        const { poster, trailer } = dto;
        const filename: string = poster.originalName;
        const content: Buffer = poster.buffer;
        const mime: string = filename
            .substring(filename.lastIndexOf('.') + 1, filename.length)
            .toUpperCase();
        const path = await this.movieService.createRandomFilename();
        const exist: boolean = await this.movieService.exists(dto.title);

        if (exist === true) {
            throw new BadRequestException({
                statusCode: ENUM_ACTOR_STATUS_CODE_ERROR.ACTOR_EXIST_ERROR,
                message: 'movie.error.exist',
            });
        }
        try {
            const poster: IAwsS3 = await this.awsService.putItemInBucket(
                `${path.filename}.${mime}`,
                content,
                {
                    path: `${path.path}/${dto.title}/poster`,
                }
            );
            const trailer: IAwsS3 = await this.awsService.putItemInBucket(
                `${path.filename}.${mime}`,
                content,
                {
                    path: `${path.path}/${dto.title}/trailer`,
                }
            );

            const actor = await this.movieService.create(dto, poster, trailer);
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
