import { Expose } from 'class-transformer'
import { Policy } from 'src/domain'

export class GroupPolicy extends Policy {
  constructor(name: string) {
    super(name, 'group')
  }

  @Expose()
  groups?: [{ id: string; path: string }]
}
