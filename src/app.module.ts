import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  CreatePolicyService,
  CreateResourceService,
  CreateScopeService,
  CheckResourcePermissionService,
  GetUserPermissionsService,
  CreateUserService,
  CreateGroupService,
  CreatePermissionService,
} from 'src/service'
import { KeycloakClient } from 'src/client'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  providers: [
    CreateResourceService,
    CreateScopeService,
    CreatePolicyService,
    CheckResourcePermissionService,
    GetUserPermissionsService,
    CreateUserService,
    CreateGroupService,
    CreatePermissionService,
    KeycloakClient,
  ],
})
export class AppModule {}
