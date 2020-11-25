import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { PolicyInterface } from 'src/interface'
import { KeycloakClient } from './keycloak.client'

@Injectable()
export class PolicyClient extends KeycloakClient {
  create(
    realm: string,
    clientId: string,
    accessToken: string,
    params: PolicyInterface,
  ): Promise<AxiosResponse> {
    return super.post(
      `/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/policy/${params['type']}`,
      params,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }
}
