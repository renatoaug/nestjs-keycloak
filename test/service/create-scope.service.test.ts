import { suite, test, timeout } from '@testdeck/jest'
import { Scope } from 'src/domain'
import { CreateScopeService } from 'src/service'
import { BaseTest } from 'test/base-test'

@suite('Create Scope Service')
export class CreateScopeServiceTest extends BaseTest {
  @test(timeout(10000))
  async 'Given a valid scope then create'() {
    const service = super.get(CreateScopeService)
    const scope = new Scope('find')

    const response = await service.perform(
      'skore',
      '46a58bf9-9180-4643-8b34-4ec3cd6bb3ad',
      super.adminToken,
      scope,
    )

    console.info('Scope', response)
  }
}
