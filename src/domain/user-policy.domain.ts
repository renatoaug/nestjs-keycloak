import { Expose } from 'class-transformer'
import { Policy } from 'src/domain'

export class UserPolicy extends Policy {
  constructor(name: string) {
    super(name, 'user')
  }

  @Expose()
  users?: string[]
}
