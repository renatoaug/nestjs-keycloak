import { Expose, Transform } from 'class-transformer'

export class Scope {
  constructor(name: string) {
    this.name = name
  }

  @Expose()
  name: string
}
