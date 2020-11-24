import { suite, test } from '@testdeck/jest'
import { BaseTest } from 'test/base-test'
import { FactoryHelper } from 'test/helper'
import { GetUserPermissionsService } from 'src/service'
import { KeycloakClient } from 'src/client'

@suite('Get User Permissions Service')
export class GetUserPermissionsServiceTest extends BaseTest {
  @test()
  async 'Given resources list then those with permission are returned'() {
    const [scope, user] = await Promise.all([
      new FactoryHelper(super.adminToken).createScope(),
      new FactoryHelper(super.adminToken).createUser(),
    ])

    const policy = await new FactoryHelper(super.adminToken).createPolicy([user.id])
    await new FactoryHelper(super.adminToken).createPermission([scope.id], [policy.id])

    const [resource1, resource2] = await Promise.all([
      new FactoryHelper(super.adminToken).createResource([{ id: scope.id, name: scope.name }]),
      new FactoryHelper(super.adminToken).createResource([{ id: scope.id, name: scope.name }]),
    ])

    const { access_token: accessToken } = await super
      .get(KeycloakClient)
      .getToken('skore', 'skore-front', user.username, 'bilu123')

    const service = super.get(GetUserPermissionsService)

    await new Promise(accept => setTimeout(() => accept(), 2000))

    const resources = await service.perform(
      'skore',
      'content',
      accessToken,
      [resource1.name, resource2.name],
      scope.name,
    )

    expect(resources).toEqual([resource1.name, resource2.name])
  }
}
