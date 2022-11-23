import { Body, Controller, Post } from '@nestjs/common';
import { MovieCreateDto } from '../dtos/movie.create.dto';
import { Response } from '../../../common/response/decorators/response.decorator';
import { AuthAdminJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { FormDataRequest } from 'nestjs-form-data';

@Controller({
    version: '1',
    path: '/movie',
})
export class MovieAdminController {
    @Response('movie.create')
    @FormDataRequest()
    @AuthAdminJwtGuard()
    @Post('/create')
    create(@Body() dto: MovieCreateDto) {
        return dto;
    }
}
