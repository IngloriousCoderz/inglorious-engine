import {
  contains,
  min,
  push,
  remove,
} from '@inglorious/utils/data-structures/heap.js'
import { abs, magnitude } from '@inglorious/utils/math/linear-algebra/vector.js'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors.js'

const NO_COST = 0

export const dijkstra = () => NO_COST
export const eucledianDistance = (a, b) =>
  magnitude(subtract(a.position, b.position))
export const manhattanDistance = (a, b) => abs(subtract(a.position, b.position))

const compareCost = (a, b) => b.cost - a.cost
const compareTotalCost = (a, b) => b.totalCost - a.totalCost

export function findPath(graph, start, end, heuristic = eucledianDistance) {
  const { nodes, arcs } = adaptGraph(graph)
  const findNode = createFindNode(nodes)

  const startNode = findNode(start)
  const endNode = findNode(end)
  let discoveredNodes = [startNode]
  let evaluatedNodes = []
  let path = []

  while (discoveredNodes.length) {
    let current = min(discoveredNodes, compareTotalCost)

    if (current.id === end) {
      while (current != null) {
        path = [current.id, ...path]
        current = current.previous
      }

      return path
    }

    discoveredNodes = remove(discoveredNodes, current)
    evaluatedNodes = push(evaluatedNodes, current)

    const outgoingArcs = arcs.filter(({ from }) => from === current.id)
    const destinations = outgoingArcs.map(({ to }) => findNode(to))

    for (const destination of destinations) {
      const totalCost =
        current.cost +
        destination.cost +
        heuristic(current, destination) +
        outgoingArcs.find(({ to }) => to === destination.id)?.cost

      let isNewPathFound = false
      if (contains(discoveredNodes, destination)) {
        if (totalCost < destination.cost) {
          destination.cost = totalCost
          isNewPathFound = true
        }
      } else {
        destination.cost = totalCost
        isNewPathFound = true
        discoveredNodes = push(discoveredNodes, destination, compareCost)
      }

      if (isNewPathFound) {
        destination.totalCost =
          destination.cost + heuristic(destination, endNode)
        destination.previous = current
      }
    }
  }
}

function adaptGraph(graph) {
  return {
    ...graph,
    nodes: Array.isArray(graph.nodes)
      ? graph.nodes.map((node) => ({ ...node, cost: node.cost ?? NO_COST }))
      : Object.entries(graph.nodes).map(([key, value]) => ({
          id: key,
          position: value,
          cost: 0,
        })),
    arcs: graph.arcs.map((arc) => ({ ...arc, cost: arc.cost ?? NO_COST })),
  }
}

function createFindNode(nodes) {
  return (id) => nodes.find((node) => node.id === id)
}
