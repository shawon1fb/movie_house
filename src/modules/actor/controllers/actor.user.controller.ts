import { Controller, Get } from '@nestjs/common';

@Controller({
    version: '1',
    path: '/actor',
})
export class ActorUserController {
    @Get('/hello')
    async hello() {
        return 'hello actor user';
    }
}
