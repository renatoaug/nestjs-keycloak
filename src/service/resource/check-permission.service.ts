import { Injectable, Logger } from '@nestjs/common'
import { ResourceClient } from 'src/client'

@Injectable()
export class CheckResourcePermissionService {
  constructor(private readonly resourceClient: ResourceClient) {}

  async perform(
    realm: string,
    accessToken: string,
    resource: string,
    scope: string,
  ): Promise<boolean> {
    try {
      const { data } = await this.resourceClient.checkUserPermission(
        realm,
        accessToken,
        resource,
        scope,
      )

      return !!data.result
    } catch (error) {
      Logger.error(
        'Error on trying to check user permission',
        error,
        CheckResourcePermissionService.name,
      )

      return false
    }
  }
}
