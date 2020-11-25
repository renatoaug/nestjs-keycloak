import { Injectable, Logger } from '@nestjs/common'
import { GroupClient } from 'src/client'
import { Group } from 'src/domain'

@Injectable()
export class CreateGroupService {
  constructor(private readonly groupClient: GroupClient) {}

  async perform(realm: string, accessToken: string, group: Group): Promise<Group> {
    try {
      if (!group.name) throw Error('Name is missing')

      const { headers } = await this.groupClient.create(realm, accessToken, group)

      group.id = headers.location
        .split('/')
        .slice(-1)
        .pop()

      return group
    } catch (error) {
      Logger.error('Error on trying to create group', error, CreateGroupService.name)

      throw error
    }
  }
}
