import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { stringify } from 'qs'

@Injectable()
export class CheckResourcePermissionService {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  async perform(
    realm: string,
    clientName: string,
    accessToken: string,
    resource: string,
    scope: string,
  ): Promise<boolean> {
    try {
      const { data } = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/realms/${realm}/protocol/openid-connect/token`,
          stringify({
            grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
            response_mode: 'decision',
            audience: clientName,
            permission: `${resource}#${scope}`,
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return !!data.result
    } catch (error) {
      Logger.error(
        'Error on trying to get user permissions',
        error,
        CheckResourcePermissionService.name,
      )

      return false
    }
  }
}
