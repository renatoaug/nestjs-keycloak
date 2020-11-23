import { suite, test } from '@testdeck/jest'
import { GroupPolicy, UserPolicy } from 'src/domain'
import { CreatePolicyService } from 'src/service'
import { BaseTest } from 'test/base-test'
import { FactoryHelper } from 'test/helper'

@suite('Create Policy Service')
export class CreatePolicyServiceTest extends BaseTest {
  @test()
  async 'Given an user-based policy then create'() {
    const user = await new FactoryHelper(super.adminToken).createUser()

    const service = super.get(CreatePolicyService)
    const policy = new UserPolicy('User Policy Test')
    policy.users = [user.id]

    const response = await service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      super.adminToken,
      policy,
    )

    expect(response.name).toEqual(policy.name)
    expect(response.type).toEqual(policy.type)
    expect(response.logic).toEqual(policy.logic)
    expect(response.decisionStrategy).toEqual(policy.decisionStrategy)
  }

  @test()
  async 'Given an group-based policy then create'() {
    const service = super.get(CreatePolicyService)
    const policy = new GroupPolicy('Group Policy Test')
    policy.groups = [{ id: 'e06bebef-8e60-4c59-b39a-9f7abcaa5f70', path: '/Skoreans' }]

    const response = await service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      super.adminToken,
      policy,
    )

    console.info('Policy', response)
  }
}
