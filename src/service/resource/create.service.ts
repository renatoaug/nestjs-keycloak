import { Injectable, Logger } from '@nestjs/common'
import { ResourceClient } from 'src/client'
import { Resource } from 'src/domain'

@Injectable()
export class CreateResourceService {
  constructor(private readonly resourceClient: ResourceClient) {}

  async perform(realm: string, accessToken: string, resource: Resource): Promise<Resource> {
    try {
      if (!resource.name || !resource.displayName) throw Error('Name or displayName is missing')

      const { data } = await this.resourceClient.create(realm, accessToken, resource)

      resource.id = data._id

      return resource
    } catch (error) {
      Logger.error('Error on trying to create client resource', error, CreateResourceService.name)

      throw error
    }
  }
}
