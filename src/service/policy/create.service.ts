import { Injectable, Logger } from '@nestjs/common'
import { KeycloakClient } from 'src/client'
import { Policy } from 'src/domain'
import { PolicyInterface } from 'src/interface'

@Injectable()
export class CreatePolicyService {
  constructor(private readonly keycloakClient: KeycloakClient) {}

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

      const { data } = await this.keycloakClient.createPolicy(realm, clientId, accessToken, params)

      return data as Policy
    } catch (error) {
      Logger.error('Error on trying to create client policy', error, CreatePolicyService.name)
    }
  }
}
