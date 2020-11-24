import { LogicType, DecisionStrategy } from 'src/domain'

export type PolicyType = 'user' | 'group'

export interface PolicyInterface {
  name: string
  type: PolicyType
  logic?: LogicType
  decisionStrategy?: DecisionStrategy
  groups?: [{ id: string; path: string }]
  users?: string[]

  isGroup(): boolean
  isUser(): boolean
}
