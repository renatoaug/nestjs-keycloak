import { Injectable, Logger } from '@nestjs/common'
import { ResourceClient } from 'src/client'
import { Resource } from 'src/domain'

@Injectable()
export class UpdateResourceService {
  constructor(private readonly resourceClient: ResourceClient) {}

  async perform(
    realm: string,
    clientId: string,
    accessToken: string,
    resource: Resource,
  ): Promise<boolean> {
    try {
      if (!resource.name || !resource.displayName) throw Error('Name or displayName is missing')

      const response = await this.resourceClient.update(realm, clientId, accessToken, resource)

      return response.status === 204
    } catch (error) {
      Logger.error('Error on trying to update client resource', error, UpdateResourceService.name)

      throw error
    }
  }
}
