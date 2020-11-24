import { Expose, Transform } from 'class-transformer'
import { PolicyInterface, PolicyType } from 'src/interface'
import { DecisionStrategy, LogicType } from 'src/domain'

export class Policy implements PolicyInterface {
  constructor(name: string, type: PolicyType) {
    this.name = name
    this.type = type
  }

  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  type: PolicyType

  @Expose({ name: 'decision_strategy' })
  @Transform(value => value || DecisionStrategy.UNANIMOUS)
  decisionStrategy?: DecisionStrategy = DecisionStrategy.UNANIMOUS

  @Expose()
  @Transform(value => value || LogicType.POSITIVE)
  logic?: LogicType = LogicType.POSITIVE

  isGroup(): boolean {
    return this.type === 'group'
  }

  isUser(): boolean {
    return this.type === 'user'
  }
}
