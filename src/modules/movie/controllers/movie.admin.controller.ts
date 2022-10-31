import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
} from '@nestjs/common';
import { MovieCreateDto } from '../dtos/movie.create.dto';
import { Response } from '../../../common/response/decorators/response.decorator';
import { UploadFileFields } from '../../../common/file/decorators/file.decorator';
import { AuthAdminJwtGuard } from '../../../common/auth/decorators/auth.jwt.decorator';
import { FileRequiredPipe } from '../../../common/file/pipes/file.required.pipe';
import { FileSizeImagePipe } from '../../../common/file/pipes/file.size.pipe';
import { FileTypeImagePipe } from '../../../common/file/pipes/file.type.pipe';
import { IFile } from '../../../common/file/file.interface';

@Controller({
    version: '1',
    path: '/movie',
})
export class MovieAdminController {
    @Response('movie.create')
    @UploadFileFields([
        { name: 'trailer', maxCount: 1 },
        { name: 'poster', maxCount: 1 },
    ])
    @AuthAdminJwtGuard()
    @Post('/create')
    create(
        @Body() dto: MovieCreateDto,
        //FileTypeImagePipe
        @UploadedFiles(FileRequiredPipe, FileSizeImagePipe)
        files: {
            trailer: IFile[];
            poster: IFile[];
        }
    ) {
        const { trailer, poster } = files;
        return trailer.map((e) => e.mimetype);
    }
}
