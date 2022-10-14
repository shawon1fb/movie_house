import { Controller, Get } from '@nestjs/common';

@Controller({
    version: '1',
    path: '/movie',
})
export class MovieUserController {}
