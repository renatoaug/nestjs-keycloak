import { Injectable, Logger } from '@nestjs/common'
import { ScopeClient } from 'src/client'
import { Scope } from 'src/domain'

@Injectable()
export class CreateScopeService {
  constructor(private readonly scopeClient: ScopeClient) {}

  async perform(
    realm: string,
    clientId: string,
    accessToken: string,
    scope: Scope,
  ): Promise<Scope> {
    try {
      const { data } = await this.scopeClient.create(realm, clientId, accessToken, scope)

      return data as Scope
    } catch (error) {
      Logger.error('Error on trying to create client scope', error, CreateScopeService.name)

      throw error
    }
  }
}
