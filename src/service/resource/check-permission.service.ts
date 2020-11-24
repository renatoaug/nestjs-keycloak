import { Injectable, Logger } from '@nestjs/common'
import { KeycloakClient } from 'src/client'

@Injectable()
export class CheckResourcePermissionService {
  constructor(private readonly keycloakClient: KeycloakClient) {}

  async perform(
    realm: string,
    clientName: string,
    accessToken: string,
    resource: string,
    scope: string,
  ): Promise<boolean> {
    try {
      const { data } = await this.keycloakClient.checkResourcePermission(
        realm,
        clientName,
        accessToken,
        resource,
        scope,
      )

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
