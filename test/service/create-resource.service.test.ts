import { suite, test, timeout } from '@testdeck/jest'
import { Resource } from 'src/domain'
import { CreateResourceService } from 'src/service'
import { BaseTest } from 'test/base-test'

@suite('Create Resource Service')
export class CreateResourceServiceTest extends BaseTest {
  @test(timeout(10000))
  async 'Given a valid resource then create'() {
    const service = super.get(CreateResourceService)
    const resource = new Resource('folderId', 'Testing')
    resource.type = 'urn:folders:root'

    const response = await service.perform(
      'skore',
      '46a58bf9-9180-4643-8b34-4ec3cd6bb3ad',
      super.adminToken,
      resource,
    )

    console.info('Resource', response)
  }
}
