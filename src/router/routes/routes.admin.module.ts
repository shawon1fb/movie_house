import { Module } from '@nestjs/common';
import { AuthModule } from 'src/common/auth/auth.module';
import { SettingAdminController } from 'src/common/setting/controllers/setting.admin.controller';
import { PermissionAdminController } from 'src/modules/permission/controllers/permission.admin.controller';
import { PermissionModule } from 'src/modules/permission/permission.module';
import { RoleAdminController } from 'src/modules/role/controllers/role.admin.controller';
import { RoleModule } from 'src/modules/role/role.module';
import { UserAdminController } from 'src/modules/user/controllers/user.admin.controller';
import { UserModule } from 'src/modules/user/user.module';
import { ActorAdminController } from '../../modules/actor/controllers/actor.admin.controller';
import { ActorModule } from '../../modules/actor/actor.module';

@Module({
    controllers: [
        SettingAdminController,
        UserAdminController,
        RoleAdminController,
        PermissionAdminController,
        ActorAdminController,
    ],
    providers: [],
    exports: [],
    imports: [
        UserModule,
        AuthModule,
        RoleModule,
        PermissionModule,
        ActorModule,
    ],
})
export class RoutesAdminModule {}
