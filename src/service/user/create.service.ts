import { Injectable, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from 'src/domain'

@Injectable()
export class CreateUserService {
  private readonly keycloakServerUrl: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.keycloakServerUrl = this.configService.get('KEYCLOAK_SERVER_URL')
  }

  async perform(realm: string, accessToken: string, user: User): Promise<User> {
    try {
      await this.httpService
        .post(
          `${this.keycloakServerUrl}/auth/admin/realms/${realm}/users`,
          {
            username: user.username,
            email: user.email,
            enabled: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .toPromise()

      return user
    } catch (error) {
      Logger.error('Error on trying to create user', error, CreateUserService.name)

      throw error.response?.data?.errorMessage || error
    }
  }
}
