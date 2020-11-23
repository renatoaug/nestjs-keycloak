import { Expose } from 'class-transformer'

export class User {
  constructor(username: string) {
    this.username = username
  }

  @Expose()
  id: string

  @Expose()
  username: string

  @Expose()
  email?: string

  @Expose({ name: 'first_name' })
  firstName?: string

  @Expose({ name: 'last_name' })
  lastName?: string

  @Expose()
  attributes?: unknown = {}
}
