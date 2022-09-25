import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

//MailerService
@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: Number.parseInt(process.env.MAIL_PORT) || 2525,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
            },
        }),
    ],
    exports: [],
})
export class MailModule {}
