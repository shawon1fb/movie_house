import { registerAs } from '@nestjs/config';

export default registerAs(
    'movie',
    (): Record<string, any> => ({
        uploadPath: '/movie',
    })
);
