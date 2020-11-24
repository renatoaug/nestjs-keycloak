import { Expose } from 'class-transformer'
import { PolicyInterface, PolicyType } from 'src/interface'
import { DecisionStrategy, LogicType } from 'src/domain'

export class Policy implements PolicyInterface {
  constructor(name: string, type: PolicyType) {
    this.name = name
    this.type = type
  }

  @Expose()
  name: string

  @Expose()
  type: PolicyType

  @Expose({ name: 'decision_strategy' })
  decisionStrategy?: DecisionStrategy = DecisionStrategy.UNANIMOUS

  @Expose()
  logic?: LogicType = LogicType.POSITIVE

  isGroup(): boolean {
    return this.type === 'group'
  }

  isUser(): boolean {
    return this.type === 'user'
  }
}
