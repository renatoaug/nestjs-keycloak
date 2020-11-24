import { Expose } from 'class-transformer'
import { Permission } from 'src/domain'

export class ResourcePermission extends Permission {
  constructor(name: string) {
    super(name, 'resource')
  }

  @Expose()
  resourceType: string
}
