import { suite, test, timeout } from '@testdeck/jest'
import { CheckResourcePermissionService } from 'src/service'
import { BaseTest } from 'test/base-test'

@suite('Check Resource Permission Service')
export class CheckResourcePermissionServiceTest extends BaseTest {
  @test(timeout(10000))
  async 'Given an user with access in resource then return false'() {
    const service = super.get(CheckResourcePermissionService)

    const hasAccess = await service.perform(
      'skore',
      'filesystem',
      super.commonToken,
      'movies',
      'ls',
    )

    expect(hasAccess).toBeTruthy()
  }
}
