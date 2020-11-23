import { Expose } from 'class-transformer'

export class Group {
  constructor(name: string) {
    this.name = name
  }

  @Expose()
  id: string

  @Expose()
  name: string
}
