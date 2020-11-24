import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Permission } from 'src/domain'
import { PermissionInterface } from 'src/interface'

@Injectable()
export class CreatePermissionService {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  async perform(
    realm: string,
    clientId: string,
    accessToken: string,
    permission: PermissionInterface,
  ): Promise<Permission> {
    try {
      if (!permission.type) throw Error('Permission type is missing')
      if (permission.isScope() && permission.scopes.length === 0) throw Error('Scopes are missing')

      const { data } = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/permission/${permission.type}`,
          {
            decisionStrategy: permission.decisionStrategy,
            logic: permission.logic,
            name: permission.name,
            policies: permission.policies,
            resources: permission.resources,
            scopes: permission.scopes,
            type: permission.type,
            resourceType: permission.resourceType,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return data as Permission
    } catch (error) {
      Logger.error('Error on trying to create permission', error, CreatePermissionService.name)

      throw error
    }
  }
}
