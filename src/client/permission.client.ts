import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { PermissionInterface } from 'src/interface'
import { KeycloakClient } from './keycloak.client'

@Injectable()
export class PermissionClient extends KeycloakClient {
  create(
    realm: string,
    accessToken: string,
    permission: PermissionInterface,
  ): Promise<AxiosResponse> {
    return super.post(
      `/auth/admin/realms/${realm}/clients/${super.clientId}/authz/resource-server/permission/${
        permission.type
      }`,
      {
        decisionStrategy: permission.decisionStrategy,
        logic: permission.logic,
        name: permission.name,
        policies: permission.policies,
        resources: permission.resources,
        scopes: permission.scopes,
        type: permission.type,
        resourceType: permission.resourceType,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }
}
