import { suite, test } from '@testdeck/jest'
import { User } from 'src/domain'
import { CreateUserService } from 'src/service'
import { BaseTest } from 'test/base-test'

@suite('Create User Service')
export class CreateUserServiceTest extends BaseTest {
  @test()
  async 'Given a valid user then create'() {
    const service = super.get(CreateUserService)
    const user = new User('renato')
    user.email = 'renato@skore.io'

    const response = await service.perform('skore', super.adminToken, user)

    expect(response.username).toEqual(user.username)
    expect(response.email).toEqual(user.email)
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
