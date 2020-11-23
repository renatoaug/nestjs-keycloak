import { Expose, Transform } from 'class-transformer'

export class Resource {
  constructor(name: string, displayName: string) {
    this.name = name
    this.displayName = displayName
  }

  @Expose()
  name: string

  @Expose({ name: 'display_name' })
  displayName: string

  @Expose()
  type?: string

  @Expose()
  attributes?: unknown = {}

  @Transform(value => value || [])
  @Expose()
  scopes?: string[] = []
}
