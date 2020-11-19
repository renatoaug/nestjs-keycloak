import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Scope } from 'src/domain'

@Injectable()
export class CreateScopeService {
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
    scope: Scope,
  ): Promise<Scope> {
    try {
      const response = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/scope`,
          {
            name: scope.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return response.data as Scope
    } catch (error) {
      Logger.error('Error on trying to create client scope', error, CreateScopeService.name)
    }
  }
}
