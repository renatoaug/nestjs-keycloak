import { HttpModule, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { GraphQLError } from 'graphql'
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
import { ResourceResolver } from 'src/resolver'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      formatError: (error: GraphQLError) => ({
        message: error.message,
      }),
    }),
    HttpModule,
  ],
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
    ResourceResolver,
  ],
})
export class AppModule {}
