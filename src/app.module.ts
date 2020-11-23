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
} from 'src/service'

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
  ],
})
export class AppModule {}
