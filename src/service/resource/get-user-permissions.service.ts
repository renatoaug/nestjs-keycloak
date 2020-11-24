import { Injectable, Logger } from '@nestjs/common'
import { stringify } from 'qs'
import { KeycloakClient } from 'src/client'

@Injectable()
export class GetUserPermissionsService {
  constructor(private readonly keycloakClient: KeycloakClient) {}

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

      const { data } = await this.keycloakClient.getUserPermissions(
        realm,
        clientName,
        accessToken,
        params,
      )

      return data.map(resource => resource.rsname)
    } catch (error) {
      Logger.error('Error on trying to get user permissions', error, GetUserPermissionsService.name)

      throw error
    }
  }
}
