import { Injectable, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

@Injectable()
export class KeycloakClient {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  post(path: string, params: unknown, headers: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.httpService.post(`${this.keycloakServerUrl}${path}`, params, headers).toPromise()
  }
}
