export type Conditions = unknown
export type Outcome = string | boolean

export interface DecisionTree {
  test: (conditions: Conditions) => Outcome
  [outcome: Outcome]: () => Outcome | DecisionTree
}

interface NodeMap {
  [id: string]: [number, number] // [x, y]
}

interface Node {
  id: string
  position: [number, number] // [x, y]
  cost?: number
}

interface Arc {
  from: string
  to: string
  cost?: number
}

export interface Graph {
  nodes: NodeMap | Node[]
  arcs: Arc[]
}
