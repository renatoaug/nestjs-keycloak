import { Injectable, Logger } from '@nestjs/common'
import { ResourceClient, UserClient } from 'src/client'

@Injectable()
export class DeleteResourceService {
  constructor(
    private readonly resourceClient: ResourceClient,
    private readonly userClient: UserClient,
  ) {}

  async perform(realm: string, resourceId: string): Promise<void> {
    try {
      const { data } = await this.userClient.getToken('master', 'admin-cli', 'admin', 'admin')

      await this.resourceClient.remove(realm, data.access_token, resourceId)
    } catch (error) {
      Logger.error('Error on trying to delete client resource', error, DeleteResourceService.name)

      throw error
    }
  }
}
