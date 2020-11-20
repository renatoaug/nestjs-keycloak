import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  CreatePolicyService,
  CreateResourceService,
  CreateScopeService,
  CheckResourcePermissionService,
  GetUserPermissionsService,
} from 'src/service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  providers: [
    CreateResourceService,
    CreateScopeService,
    CreatePolicyService,
    CheckResourcePermissionService,
    GetUserPermissionsService,
  ],
})
export class AppModule {}
