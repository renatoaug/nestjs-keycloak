import { Injectable, Logger } from '@nestjs/common'
import { PolicyClient } from 'src/client'
import { Policy } from 'src/domain'
import { PolicyInterface } from 'src/interface'

@Injectable()
export class CreatePolicyService {
  constructor(private readonly policyClient: PolicyClient) {}

  async perform(
    realm: string,
    clientId: string,
    accessToken: string,
    policy: PolicyInterface,
  ): Promise<Policy> {
    try {
      const { data } = await this.policyClient.create(realm, clientId, accessToken, policy)

      return data as Policy
    } catch (error) {
      Logger.error('Error on trying to create client policy', error, CreatePolicyService.name)
    }
  }
}
