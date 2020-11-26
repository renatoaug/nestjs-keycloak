import { suite, test } from '@testdeck/jest'
import { plainToClass } from 'class-transformer'
import { BaseTest } from 'test/base-test'
import { FactoryHelper } from 'test/helper'
import { Resource } from 'src/domain'
import { UpdateResourceService } from 'src/service'
import * as faker from 'faker'

@suite('Update Resource Service')
export class UpdateResourceServiceTest extends BaseTest {
  @test()
  async 'Given a valid resource then update'() {
    const resource = await new FactoryHelper(super.adminToken).createResource()
    const service = super.get(UpdateResourceService)

    const response = await service.perform(
      'skore',
      super.adminToken,
      plainToClass(Resource, {
        id: resource.id,
        name: faker.name.title(),
        display_name: faker.random.word(),
        type: 'urn:folders:downloads',
      }),
    )

    expect(response).toBeUndefined()
  }

  @test()
  async 'Given an not found resource then throw error'() {
    const service = super.get(UpdateResourceService)

    try {
      await service.perform(
        'skore',
        super.adminToken,
        plainToClass(Resource, {
          id: 'not_found',
          name: faker.name.title(),
          display_name: faker.random.word(),
          type: 'urn:folders:downloads',
        }),
      )
    } catch (error) {
      expect(error.message).toEqual('Request failed with status code 404')
    }
  }
}
