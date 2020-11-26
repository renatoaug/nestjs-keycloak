import { suite, test } from '@testdeck/jest'
import { BaseTest } from 'test/base-test'
import { FactoryHelper } from 'test/helper'
import { DeleteResourceService } from 'src/service'

@suite('Delete Resource Service')
export class DeleteResourceServiceTest extends BaseTest {
  @test()
  async 'Given a valid resource then delete'() {
    const resource = await new FactoryHelper(super.adminToken).createResource()
    const service = super.get(DeleteResourceService)

    const response = await service.perform('skore', resource.id)

    expect(response).toBeUndefined()
  }

  @test()
  async 'Given a not found resource then throw error'() {
    const service = super.get(DeleteResourceService)

    try {
      await service.perform('skore', 'not_found')
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404')
    }
  }
}
