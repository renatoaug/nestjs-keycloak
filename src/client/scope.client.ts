import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { Scope } from 'src/domain'
import { KeycloakClient } from './keycloak.client'

@Injectable()
export class ScopeClient extends KeycloakClient {
  create(
    realm: string,
    clientId: string,
    accessToken: string,
    scope: Scope,
  ): Promise<AxiosResponse> {
    return super.post(
      `/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/scope`,
      {
        name: scope.name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }
}
