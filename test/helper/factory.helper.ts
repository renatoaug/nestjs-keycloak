import * as faker from 'faker'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { Group, User } from 'src/domain'
import { CreateUserService, CreateGroupService } from 'src/service'

export class FactoryHelper {
  constructor(private readonly accessToken: string) {}

  async createUser(): Promise<User> {
    const app = await this.createNestApplication()
    const service = app.get(CreateUserService)

    return service.perform('skore', this.accessToken, new User(faker.internet.userName()))
  }

  async createGroup(): Promise<Group> {
    const app = await this.createNestApplication()
    const service = app.get(CreateGroupService)

    return service.perform('skore', this.accessToken, new Group(faker.internet.userName()))
  }

  private async createNestApplication() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    return moduleRef.createNestApplication().init()
  }
}
