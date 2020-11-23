import { suite, test } from '@testdeck/jest'
import { User } from 'src/domain'
import { CreateUserService } from 'src/service'
import { BaseTest } from 'test/base-test'
import * as faker from 'faker'

@suite('Create User Service')
export class CreateUserServiceTest extends BaseTest {
  @test()
  async 'Given a valid user then create'() {
    const service = super.get(CreateUserService)
    const user = new User(faker.internet.userName())

    user.email = faker.internet.email()
    user.firstName = faker.name.firstName()
    user.lastName = faker.name.lastName()
    user.attributes = { organization_id: '123456' }

    const response = await service.perform('skore', super.adminToken, user)

    expect(response.id).toBeDefined()
    expect(response.username).toEqual(user.username)
    expect(response.email).toEqual(user.email)
    expect(response.firstName).toEqual(user.firstName)
    expect(response.lastName).toEqual(user.lastName)
    expect(response.attributes).toEqual(user.attributes)
  }

  @test()
  async 'Given an invalid user then throw error'() {
    const service = super.get(CreateUserService)

    try {
      await service.perform('skore', super.adminToken, {} as User)
    } catch (error) {
      expect(error).toEqual('User name is missing')
    }
  }
}
