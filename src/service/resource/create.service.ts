import { Injectable, Logger } from '@nestjs/common'
import { KeycloakClient } from 'src/client'
import { Resource } from 'src/domain'

@Injectable()
export class CreateResourceService {
  constructor(private readonly keycloakClient: KeycloakClient) {}

  async perform(
    realm: string,
    clientId: string,
    accessToken: string,
    resource: Resource,
  ): Promise<Resource> {
    try {
      if (!resource.name || !resource.displayName) throw Error('Name or displayName is missing')

      const { data } = await this.keycloakClient.createResource(
        realm,
        clientId,
        accessToken,
        resource,
      )

      resource.id = data._id

      return resource
    } catch (error) {
      Logger.error('Error on trying to create client resource', error, CreateResourceService.name)

      throw error
    }
  }
}
