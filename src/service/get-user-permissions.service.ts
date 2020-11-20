import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { stringify } from 'qs'

@Injectable()
export class GetUserPermissionsService {
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
    resources: string[],
    scope: string,
  ): Promise<string[]> {
    try {
      let params = stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
        audience: clientName,
        response_mode: 'permissions',
      })

      for (const resource of resources) params += `&permission=${resource}%23${scope}`

      const { data } = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/realms/${realm}/protocol/openid-connect/token`,
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return data.map(resource => resource.rsname)
    } catch (error) {
      Logger.error('Error on trying to get user permissions', error, GetUserPermissionsService.name)

      throw error
    }
  }
}
