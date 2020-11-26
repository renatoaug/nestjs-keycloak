import { suite, test } from '@testdeck/jest'
import { ResourcePermission, ScopePermission } from 'src/domain'
import { CreatePermissionService } from 'src/service'
import { BaseTest } from 'test/base-test'
import { FactoryHelper } from 'test/helper'
import * as faker from 'faker'

@suite('Create Permission Service')
export class CreatePermissionServiceTest extends BaseTest {
  @test()
  async 'Given a scope-based permission then create'() {
    const scope = await new FactoryHelper(super.adminToken).createScope()

    const service = super.get(CreatePermissionService)
    const permission = new ScopePermission(faker.name.title())
    permission.scopes = [scope.id]

    const response = await service.perform('skore', super.adminToken, permission)

    expect(response.name).toEqual(permission.name)
    expect(response.type).toEqual(permission.type)
    expect(response.logic).toEqual(permission.logic)
    expect(response.decisionStrategy).toEqual(permission.decisionStrategy)
    expect(response['scopes']).toEqual(permission.scopes)
  }

  @test()
  async 'Given a scope-based permission without scopes then throw error'() {
    const service = super.get(CreatePermissionService)
    const permission = new ScopePermission(faker.name.title())

    try {
      await service.perform('skore', super.adminToken, permission)
    } catch (error) {
      expect(error.message).toEqual('Scopes are missing')
    }
  }

  @test()
  async 'Given a resource-based permission then create'() {
    const resource = await new FactoryHelper(super.adminToken).createResource()

    const service = super.get(CreatePermissionService)

    const permission = new ResourcePermission(faker.name.title())
    permission.resources = [resource.id]

    const response = await service.perform('skore', super.adminToken, permission)

    expect(response.name).toEqual(permission.name)
    expect(response.type).toEqual(permission.type)
    expect(response.logic).toEqual(permission.logic)
    expect(response.decisionStrategy).toEqual(permission.decisionStrategy)
    expect(response.resources).toEqual(permission.resources)
  }

  @test()
  async 'Given a resource-based by type permission then create'() {
    const resource = await new FactoryHelper(super.adminToken).createResource()

    const service = super.get(CreatePermissionService)

    const permission = new ResourcePermission(faker.name.title())
    permission.resourceType = resource.type

    const response = await service.perform('skore', super.adminToken, permission)

    expect(response.name).toEqual(permission.name)
    expect(response.type).toEqual(permission.type)
    expect(response.logic).toEqual(permission.logic)
    expect(response.decisionStrategy).toEqual(permission.decisionStrategy)
    expect(response.resources).toHaveLength(0)
    expect(response['resourceType']).toEqual(permission.resourceType)
  }
}
