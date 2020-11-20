import { Expose } from 'class-transformer'
import { PolicyInterface } from 'src/domain'

type PolicyType = 'user' | 'group'
type LogicType = 'POSITIVE' | 'NEGATIVE'
type DecisionStrategyType = 'UNANIMOUS'

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
  decisionStrategy?: DecisionStrategyType = 'UNANIMOUS'

  @Expose()
  logic?: LogicType = 'POSITIVE'

  isGroup(): boolean {
    return this.type === 'group'
  }

  isUser(): boolean {
    return this.type === 'user'
  }
}
