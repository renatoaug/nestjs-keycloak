import { suite, test } from '@testdeck/jest'
import { Group } from 'src/domain'
import { CreateGroupService } from 'src/service'
import { BaseTest } from 'test/base-test'
import * as faker from 'faker'

@suite('Create Group Service')
export class CreateGroupServiceTest extends BaseTest {
  @test()
  async 'Given a valid group then create'() {
    const service = super.get(CreateGroupService)
    const group = new Group(faker.name.jobTitle())

    const response = await service.perform('skore', super.adminToken, group)

    expect(response.id).toBeDefined()
    expect(response.name).toEqual(group.name)
  }

  @test()
  async 'Given an invalid group then throw error'() {
    const service = super.get(CreateGroupService)

    try {
      await service.perform('skore', super.adminToken, {} as Group)
    } catch (error) {
      expect(error.message).toEqual('Name is missing')
    }
  }
}
