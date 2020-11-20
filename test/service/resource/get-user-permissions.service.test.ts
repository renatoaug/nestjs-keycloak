import { suite, test, timeout } from '@testdeck/jest'
import { GetUserPermissionsService } from 'src/service'
import { BaseTest } from 'test/base-test'

@suite('Get User Permissions Service')
export class GetUserPermissionsServiceTest extends BaseTest {
  @test(timeout(10000))
  async 'Given a resources list then those with permission are returned'() {
    const service = super.get(GetUserPermissionsService)

    const resources = await service.perform(
      'skore',
      'filesystem',
      super.commonToken,
      ['movies', 'downloads'],
      'ls',
    )

    expect(resources).toEqual(['movies', 'downloads'])
  }
}
