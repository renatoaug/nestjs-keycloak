import { Expose } from 'class-transformer'
import { Permission } from 'src/domain'

export class ScopePermission extends Permission {
  constructor(name: string) {
    super(name, 'scope')
  }

  @Expose()
  scopes: string[] = []
}
