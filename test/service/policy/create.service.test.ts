import { suite, test, timeout } from '@testdeck/jest'
import { GroupPolicy, UserPolicy } from 'src/domain'
import { CreatePolicyService } from 'src/service'
import { BaseTest } from 'test/base-test'

@suite('Create Policy Service')
export class CreatePolicyServiceTest extends BaseTest {
  @test(timeout(10000))
  async 'Given an user-based policy then create'() {
    const service = super.get(CreatePolicyService)
    const policy = new UserPolicy('User Policy Test')
    policy.users = ['06bb9308-10b4-4a3f-9b62-a21183cf273b']

    const response = await service.perform(
      'skore',
      '46a58bf9-9180-4643-8b34-4ec3cd6bb3ad',
      super.adminToken,
      policy,
    )

    console.info('Policy', response)
  }

  @test(timeout(10000))
  async 'Given an group-based policy then create'() {
    const service = super.get(CreatePolicyService)
    const policy = new GroupPolicy('Group Policy Test')
    policy.groups = [{ id: 'e06bebef-8e60-4c59-b39a-9f7abcaa5f70', path: '/Skoreans' }]

    const response = await service.perform(
      'skore',
      '46a58bf9-9180-4643-8b34-4ec3cd6bb3ad',
      super.adminToken,
      policy,
    )

    console.info('Policy', response)
  }
}
