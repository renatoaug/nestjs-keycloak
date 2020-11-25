import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { Group } from 'src/domain'
import { KeycloakClient } from './keycloak.client'

@Injectable()
export class GroupClient extends KeycloakClient {
  create(realm: string, accessToken: string, group: Group): Promise<AxiosResponse> {
    return super.post(
      `/auth/admin/realms/${realm}/groups`,
      {
        name: group.name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }
}
