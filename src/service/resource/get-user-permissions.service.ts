import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { stringify } from 'qs'
import { ResourceClient } from 'src/client'

@Injectable()
export class GetUserPermissionsService {
  constructor(
    private readonly resourceClient: ResourceClient,
    private readonly configService: ConfigService,
  ) {}

  async perform(
    realm: string,
    accessToken: string,
    resources: string[],
    scope: string,
  ): Promise<string[]> {
    try {
      let params = stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
        audience: this.configService.get('KEYCLOAK_CLIENT_NAME'),
        response_mode: 'permissions',
      })

      for (const resource of resources) params += `&permission=${resource}%23${scope}`

      const { data } = await this.resourceClient.getUserPermissions(realm, accessToken, params)

      return data.map(resource => resource.rsname)
    } catch (error) {
      Logger.error('Error on trying to get user permissions', error, GetUserPermissionsService.name)

      return []
    }
  }
}
