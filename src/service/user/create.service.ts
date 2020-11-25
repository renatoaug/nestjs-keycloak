import { Injectable, Logger } from '@nestjs/common'
import { UserClient } from 'src/client'
import { User } from 'src/domain'

@Injectable()
export class CreateUserService {
  constructor(private readonly userClient: UserClient) {}

  async perform(realm: string, accessToken: string, user: User): Promise<User> {
    try {
      const { headers } = await this.userClient.create(realm, accessToken, user)

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
