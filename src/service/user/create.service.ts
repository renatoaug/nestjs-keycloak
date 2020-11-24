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
      const { headers } = await this.httpService
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
                value: 'bilu123',
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

      user.id = headers.location
        .split('/')
        .slice(-1)
        .pop()

      return user
    } catch (error) {
      Logger.error('Error on trying to create user', error, CreateUserService.name)

      throw error.response?.data?.errorMessage || error
    }
  }
}
