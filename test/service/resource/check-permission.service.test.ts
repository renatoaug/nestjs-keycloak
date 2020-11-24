import { suite, test } from '@testdeck/jest'
import { BaseTest } from 'test/base-test'
import { FactoryHelper } from 'test/helper'
import { CheckResourcePermissionService } from 'src/service'
import { KeycloakClient } from 'src/client'

@suite('Check Resource Permission Service')
export class CheckResourcePermissionServiceTest extends BaseTest {
  @test()
  async 'Given an user with access in resource then return true'() {
    const [scope, user] = await Promise.all([
      new FactoryHelper(super.adminToken).createScope(),
      new FactoryHelper(super.adminToken).createUser(),
    ])

    const policy = await new FactoryHelper(super.adminToken).createPolicy([user.id])
    await new FactoryHelper(super.adminToken).createPermission([scope.id], [policy.id])

    const resource = await new FactoryHelper(super.adminToken).createResourceWithScopes([
      { id: scope.id, name: scope.name },
    ])

    const { access_token: accessToken } = await super
      .get(KeycloakClient)
      .getToken('skore', 'skore-front', user.username, 'bilu123')

    const service = super.get(CheckResourcePermissionService)

    const hasAccess = await service.perform(
      'skore',
      'content',
      accessToken,
      resource.name,
      scope.name,
    )

    expect(hasAccess).toBeTruthy()
  }

  @test()
  async 'Given an user without access in resource then return false'() {
    const [scope, user] = await Promise.all([
      new FactoryHelper(super.adminToken).createScope(),
      new FactoryHelper(super.adminToken).createUser(),
    ])

    const resource = await new FactoryHelper(super.adminToken).createResourceWithScopes([
      { id: scope.id, name: scope.name },
    ])

    const { access_token: accessToken } = await super
      .get(KeycloakClient)
      .getToken('skore', 'skore-front', user.username, 'bilu123')

    const service = super.get(CheckResourcePermissionService)

    const hasAccess = await service.perform(
      'skore',
      'content',
      accessToken,
      resource.name,
      scope.name,
    )

    expect(hasAccess).toBeFalsy()
  }
}
