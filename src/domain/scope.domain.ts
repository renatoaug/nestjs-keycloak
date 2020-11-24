import { Expose } from 'class-transformer'

export class Scope {
  constructor(name: string) {
    this.name = name
  }

  @Expose()
  id: string

  @Expose()
  name: string
}
