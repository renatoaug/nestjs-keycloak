import { LogicType, DecisionStrategy } from 'src/domain'

export type PermissionType = 'scope' | 'resource'

export interface PermissionInterface {
  name: string
  type: PermissionType
  logic?: LogicType
  decisionStrategy?: DecisionStrategy
  scopes?: string[]
  resources?: string[]
  policies?: string[]
  resourceType?: string

  isScope(): boolean
  isResource(): boolean
}
