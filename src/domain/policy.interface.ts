export type PolicyType = 'user' | 'group'
export type LogicType = 'POSITIVE' | 'NEGATIVE'
export type DecisionStrategyType = 'UNANIMOUS'

export interface PolicyInterface {
  name: string
  type: PolicyType
  logic?: LogicType
  decisionStrategy?: DecisionStrategyType
  groups?: [{ id: string; path: string }]
  users?: string[]

  isGroup(): boolean
  isUser(): boolean
}
