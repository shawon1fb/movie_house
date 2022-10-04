import { registerAs } from '@nestjs/config';

export default registerAs(
    'actor',
    (): Record<string, any> => ({
        uploadPath: '/actor',
    })
);
