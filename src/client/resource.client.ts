import { Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { stringify } from 'qs'
import { Resource } from 'src/domain'
import { KeycloakClient } from './keycloak.client'

@Injectable()
export class ResourceClient extends KeycloakClient {
  create(realm: string, accessToken: string, resource: Resource): Promise<AxiosResponse> {
    return super.post(
      `/auth/admin/realms/${realm}/clients/${super.clientId}/authz/resource-server/resource`,
      {
        name: resource.name,
        displayName: resource.displayName,
        type: resource.type,
        scopes: resource.scopes,
        attributes: resource.attributes,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  update(realm: string, accessToken: string, resource: Resource): Promise<AxiosResponse> {
    return super.put(
      `/auth/admin/realms/${realm}/clients/${super.clientId}/authz/resource-server/resource/${
        resource.id
      }`,
      {
        name: resource.name,
        displayName: resource.displayName,
        type: resource.type,
        scopes: resource.scopes,
        attributes: resource.attributes,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  remove(realm: string, accessToken: string, resourceId: string): Promise<AxiosResponse> {
    return super.delete(
      `/auth/admin/realms/${realm}/clients/${
        super.clientId
      }/authz/resource-server/resource/${resourceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }

  getUserPermissions(realm: string, accessToken: string, params: unknown): Promise<AxiosResponse> {
    return super.post(`/auth/realms/${realm}/protocol/openid-connect/token`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  checkUserPermission(
    realm: string,
    accessToken: string,
    resource: string,
    scope: string,
  ): Promise<AxiosResponse> {
    return super.post(
      `/auth/realms/${realm}/protocol/openid-connect/token`,
      stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
        response_mode: 'decision',
        audience: super.clientName,
        permission: `${resource}#${scope}`,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
  }
}
