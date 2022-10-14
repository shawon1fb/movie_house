import { applyDecorators, UseInterceptors } from '@nestjs/common';
import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export function UploadFileSingle(field: string): any {
    return applyDecorators(UseInterceptors(FileInterceptor(field)));
}

export function UploadFileMultiple(field: string): any {
    return applyDecorators(UseInterceptors(FilesInterceptor(field)));
}

export function UploadFileFields(field: MulterField[]): any {
    return applyDecorators(UseInterceptors(FileFieldsInterceptor(field)));
}
