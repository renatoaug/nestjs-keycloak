import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Policy } from 'src/domain'
import { PolicyInterface } from 'src/interface'

@Injectable()
export class CreatePolicyService {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  async perform(
    realm: string,
    clientId: string,
    accessToken: string,
    policy: PolicyInterface,
  ): Promise<Policy> {
    try {
      const params = {
        name: policy.name,
        decisionStrategy: policy.decisionStrategy,
        logic: policy.logic,
        type: policy.type,
      }

      if (policy.isUser()) params['users'] = policy.users
      if (policy.isGroup()) params['groups'] = policy.groups

      const { data } = await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/admin/realms/${realm}/clients/${clientId}/authz/resource-server/policy/${policy.type}`,
          params,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return data as Policy
    } catch (error) {
      Logger.error('Error on trying to create client policy', error, CreatePolicyService.name)
    }
  }
}
