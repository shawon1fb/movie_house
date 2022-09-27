import { Controller, Get, Post } from '@nestjs/common';

@Controller({
    version: '1',
    path: '/actor',
})
export class ActorAdminController {
    @Get('/hello')
    async hello() {
        return 'hello actor admin';
    }

    @Post('/create')
    async create() {
        return 'created';
    }

    @Get('/list')
    async list() {
        return 'list';
    }

    @Get('/single/:id')
    async getSingle() {
        return 'get single actor';
    }
}
