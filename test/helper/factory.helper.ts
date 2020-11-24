import * as faker from 'faker'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { plainToClass } from 'class-transformer'
import { Group, Resource, Scope, User } from 'src/domain'
import {
  CreateUserService,
  CreateGroupService,
  CreateScopeService,
  CreateResourceService,
} from 'src/service'

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

  async createScope(): Promise<Scope> {
    const app = await this.createNestApplication()
    const service = app.get(CreateScopeService)

    return service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      this.accessToken,
      new Scope(faker.internet.userName()),
    )
  }

  async createResource(): Promise<Resource> {
    const app = await this.createNestApplication()
    const service = app.get(CreateResourceService)

    return service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      this.accessToken,
      plainToClass(Resource, {
        name: faker.name.title(),
        display_name: faker.random.word(),
        type: 'urn:folders:root',
      }),
    )
  }

  private async createNestApplication() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    return moduleRef.createNestApplication().init()
  }
}
