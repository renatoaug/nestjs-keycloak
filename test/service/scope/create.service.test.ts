import { suite, test } from '@testdeck/jest'
import { Scope } from 'src/domain'
import { CreateScopeService } from 'src/service'
import { BaseTest } from 'test/base-test'
import * as faker from 'faker'

@suite('Create Scope Service')
export class CreateScopeServiceTest extends BaseTest {
  @test()
  async 'Given a valid scope then create'() {
    const service = super.get(CreateScopeService)
    const scope = new Scope(faker.hacker.verb())

    const response = await service.perform('skore', super.adminToken, scope)

    expect(scope.name).toEqual(response.name)
  }

  @test()
  async 'Given an invalid scope then throw error'() {
    const service = super.get(CreateScopeService)

    try {
      await service.perform('skore', super.adminToken, {} as Scope)
    } catch (error) {
      expect(error).toBeDefined()
    }
  }
}
