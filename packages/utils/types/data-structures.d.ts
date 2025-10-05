/**
 * Represents a generic tree data structure.
 * Each node in the tree has a value and an array of child nodes.
 * @template T - The type of the value stored in the tree nodes. Defaults to `any`.
 */
export interface Tree<T = any> {
  /** The value of the current node. */
  value: T
  /** An array of child `Tree` nodes. */
  children: Tree<T>[]
}

/**
 * A map where keys are node identifiers and values are their [x, y] coordinates.
 * Used for efficient node lookups by ID.
 */
export interface NodeMap {
  [id: string]: [number, number] // [x, y]
}

/**
 * Represents a node in a graph.
 */
export interface Node {
  /** A unique identifier for the node. */
  id: string
  /** The [x, y] coordinates of the node. */
  position: [number, number] // [x, y]
  /** An optional cost associated with traversing to this node. */
  cost?: number
}

/**
 * Represents a directed edge (or arc) between two nodes in a graph.
 */
export interface Arc {
  /** The ID of the starting node. */
  from: string
  /** The ID of the ending node. */
  to: string
  /** An optional cost associated with traversing this arc. */
  cost?: number
}

/**
 * Represents a graph structure consisting of nodes and arcs.
 */
export interface Graph {
  /** The nodes of the graph, as either an array or a map for efficient lookups. */
  nodes: NodeMap | Node[]
  /** An array of arcs connecting the nodes. */
  arcs: Arc[]
}
