import { Expose } from 'class-transformer'

export class User {
  constructor(username: string) {
    this.username = username
  }

  @Expose()
  username: string

  @Expose()
  email?: string

  @Expose()
  attributes?: unknown = {}
}
