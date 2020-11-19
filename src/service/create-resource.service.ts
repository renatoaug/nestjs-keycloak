import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Resource } from 'src/domain'

@Injectable()
export class CreateResourceService {
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
    resource: Resource,
  ): Promise<Resource> {
    try {
      const response = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/resource`,
          {
            name: resource.name,
            displayName: resource.displayName,
            type: resource.type,
            scopes: resource.scopes,
            attributes: {},
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return response.data as Resource
    } catch (error) {
      Logger.error('Error on trying to create client resource', error, CreateResourceService.name)
    }
  }
}
