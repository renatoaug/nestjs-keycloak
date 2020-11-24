import { Expose } from 'class-transformer'
import { PermissionType, PermissionInterface } from 'src/interface'
import { DecisionStrategy, LogicType } from 'src/domain'

export class Permission implements PermissionInterface {
  constructor(name: string, type: PermissionType) {
    this.name = name
    this.type = type
  }

  @Expose()
  name: string

  @Expose()
  type: PermissionType

  @Expose({ name: 'decision_strategy' })
  decisionStrategy?: DecisionStrategy = DecisionStrategy.UNANIMOUS

  @Expose()
  logic?: LogicType = LogicType.POSITIVE

  @Expose()
  policies?: string[] = []

  @Expose()
  resources?: string[] = []

  isScope(): boolean {
    return this.type === 'scope'
  }

  isResource(): boolean {
    return this.type === 'resource'
  }
}
