import * as faker from 'faker'
import { Test } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { plainToClass } from 'class-transformer'
import {
  Group,
  Permission,
  Policy,
  Resource,
  Scope,
  ScopePermission,
  User,
  UserPolicy,
} from 'src/domain'
import {
  CreateUserService,
  CreateGroupService,
  CreateScopeService,
  CreateResourceService,
  CreatePolicyService,
  CreatePermissionService,
} from 'src/service'

export class FactoryHelper {
  constructor(private readonly accessToken: string) {}

  async createUser(): Promise<User> {
    const app = await this.createNestApplication()
    const service = app.get(CreateUserService)

    return service.perform(
      'skore',
      this.accessToken,
      plainToClass(User, { username: faker.internet.userName(), password: 'bilu123' }),
    )
  }

  async createGroup(): Promise<Group> {
    const app = await this.createNestApplication()
    const service = app.get(CreateGroupService)

    return service.perform('skore', this.accessToken, new Group(faker.name.jobTitle()))
  }

  async createScope(): Promise<Scope> {
    const app = await this.createNestApplication()
    const service = app.get(CreateScopeService)

    return service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      this.accessToken,
      new Scope(faker.hacker.verb()),
    )
  }

  async createPolicy(userIds: string[]): Promise<Policy> {
    const app = await this.createNestApplication()
    const service = app.get(CreatePolicyService)

    return service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      this.accessToken,
      plainToClass(UserPolicy, {
        name: faker.name.title(),
        users: userIds,
        type: 'user',
      }),
    )
  }

  async createPermission(scopeIds: string[], policyIds: string[]): Promise<Permission> {
    const app = await this.createNestApplication()
    const service = app.get(CreatePermissionService)

    return service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      this.accessToken,
      plainToClass(ScopePermission, {
        name: faker.name.title(),
        scopes: scopeIds,
        policies: policyIds,
        type: 'scope',
      }),
    )
  }

  async createResource(scopes = []): Promise<Resource> {
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
        scopes,
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
