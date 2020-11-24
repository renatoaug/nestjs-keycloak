/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { stringify } from 'qs'
import { Group, Resource, Scope, User } from 'src/domain'
import { PermissionInterface } from 'src/interface'

@Injectable()
export class KeycloakClient {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  async getToken(
    realm: string,
    clientName: string,
    username: string,
    password: string,
  ): Promise<any> {
    const { data } = await this.httpService
      .post(
        `${this.configService.get(
          'KEYCLOAK_SERVER_URL',
        )}/auth/realms/${realm}/protocol/openid-connect/token`,
        stringify({
          client_id: clientName,
          grant_type: 'password',
          username,
          password,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 15000 },
      )
      .toPromise()

    return data
  }

  createGroup(realm: string, accessToken: string, group: Group): any {
    return this.httpService
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
  }

  createPermission(
    realm: string,
    clientId: string,
    accessToken: string,
    permission: PermissionInterface,
  ): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/permission/${permission.type}`,
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
      .toPromise()
  }

  createPolicy(realm: string, clientId: string, accessToken: string, params: unknown): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/policy/${params['type']}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .toPromise()
  }

  createScope(realm: string, clientId: string, accessToken: string, scope: Scope): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/scope`,
        {
          name: scope.name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .toPromise()
  }

  createUser(realm: string, accessToken: string, user: User): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/admin/realms/${realm}/users`,
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
      .toPromise()
  }

  createResource(realm: string, clientId: string, accessToken: string, resource: Resource): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/resource`,
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
      .toPromise()
  }

  getUserPermissions(realm: string, clientName: string, accessToken: string, params: unknown): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/realms/${realm}/protocol/openid-connect/token`,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .toPromise()
  }

  checkResourcePermission(
    realm: string,
    clientName: string,
    accessToken: string,
    resource: string,
    scope: string,
  ): any {
    return this.httpService
      .post(
        `${this.keycloakServerUrl}/auth/realms/${realm}/protocol/openid-connect/token`,
        stringify({
          grant_type: 'urn:ietf:params:oauth:grant-type:uma-ticket',
          response_mode: 'decision',
          audience: clientName,
          permission: `${resource}#${scope}`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .toPromise()
  }
}
