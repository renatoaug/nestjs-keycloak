import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Group } from 'src/domain'

@Injectable()
export class CreateGroupService {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  async perform(realm: string, accessToken: string, group: Group): Promise<Group> {
    try {
      if (!group.name) throw Error('Name is missing')

      const { headers } = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/admin/realms/${realm}/groups`,
          {
            name: group.name,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

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
