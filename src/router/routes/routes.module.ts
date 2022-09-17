import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { SettingController } from 'src/common/setting/controllers/setting.controller';
import { HealthController } from 'src/health/controllers/health.controller';
import { HealthModule } from 'src/health/health.module';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleModule } from 'src/modules/role/role.module';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from '../../common/auth/controllers/auth.controller';
import { UserVerificationController } from '../../modules/user/controllers/user.verification.controller';

@Module({
    controllers: [
        SettingController,
        UserController,
        HealthController,
        AuthController,
        UserVerificationController,
    ],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        AwsModule,
        PermissionModule,
        RoleModule,
        HealthModule,
        TerminusModule,
        HttpModule,
    ],
})
export class RoutesModule {}
