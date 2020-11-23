import * as faker from 'faker'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { User } from 'src/domain'
import { CreateUserService } from 'src/service'

export class FactoryHelper {
  constructor(private readonly accessToken: string) {}

  async createUser(): Promise<User> {
    const app = await this.createNestApplication()
    const service = app.get(CreateUserService)

    return service.perform('skore', this.accessToken, new User(faker.internet.userName()))
  }

  private async createNestApplication() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    return moduleRef.createNestApplication().init()
  }
}
