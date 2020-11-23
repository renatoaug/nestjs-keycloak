import { suite, test } from '@testdeck/jest'
import { Resource } from 'src/domain'
import { CreateResourceService } from 'src/service'
import { BaseTest } from 'test/base-test'
import * as faker from 'faker'

@suite('Create Resource Service')
export class CreateResourceServiceTest extends BaseTest {
  @test()
  async 'Given a valid resource then create'() {
    const service = super.get(CreateResourceService)
    const resource = new Resource(faker.name.title(), faker.random.word())
    resource.type = 'urn:folders:root'
    resource.attributes = { key: 'value' }

    const response = await service.perform(
      'skore',
      '7a167d98-54d7-4a8a-8464-d25a24b26385',
      super.adminToken,
      resource,
    )

    expect(response.name).toEqual(resource.name)
    expect(response.type).toEqual(resource.type)
    expect(response.displayName).toEqual(resource.displayName)
    expect(response.attributes).toBeDefined()
  }

  @test()
  async 'Given an invalid resource then throw error'() {
    const service = super.get(CreateResourceService)
    const resource = new Resource(null, faker.random.word())

    try {
      await service.perform(
        'skore',
        '7a167d98-54d7-4a8a-8464-d25a24b26385',
        super.adminToken,
        resource,
      )
    } catch (error) {
      expect(error.message).toEqual('Name or displayName is missing')
    }
  }
}
