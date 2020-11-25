import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import { User } from 'src/domain'
import { KeycloakClient } from './keycloak.client'

@Injectable()
export class UserClient extends KeycloakClient {
  create(realm: string, accessToken: string, user: User): Promise<AxiosResponse> {
    return super.post(
      `/auth/admin/realms/${realm}/users`,
      {
        username: user.username,
        email: user.email,
        attributes: user.attributes,
        firstName: user.firstName,
        lastName: user.lastName,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: user.password,
            temporary: false,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  getToken(
    realm: string,
    clientName: string,
    username: string,
    password: string,
  ): Promise<AxiosResponse> {
    return super.post(
      `/auth/realms/${realm}/protocol/openid-connect/token`,
      stringify({
        client_id: clientName,
        grant_type: 'password',
        username,
        password,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 15000 },
    )
  }
}
