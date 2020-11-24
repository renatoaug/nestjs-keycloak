/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { stringify } from 'qs'

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
}
