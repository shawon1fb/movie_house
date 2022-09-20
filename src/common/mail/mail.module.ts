import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

//MailerService
@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'mail.shahanulshaheb.com',
                port: 2525,
                auth: {
                    user: '_mainaccount@shahanulshaheb.com',
                    pass: '',
                },
            },
        }),
    ],
    exports: [],
})
export class MailModule {}
