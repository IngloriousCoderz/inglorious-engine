/* eslint-disable no-magic-numbers */

import { contains, min, push, remove } from '@ezpz/utils/data-structures/heap'
import { abs, magnitude } from '@ezpz/utils/math/linear-algebra/vector'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'

export const dijkstra = () => 0
export const eucledianDistance = (a, b) =>
  magnitude(subtract(a.position, b.position))
export const manhattanDistance = (a, b) => abs(subtract(a.position, b.position))

const compareCost = (a, b) => b.cost - a.cost
const compareTotalCost = (a, b) => b.totalCost - a.totalCost

export function findPath(
  originalGraph,
  start,
  end,
  heuristic = eucledianDistance
) {
  const graph = adaptGraph(originalGraph)
  const findNode = createFindNode(graph)

  const endNode = findNode(end)
  let discoveredNodes = [findNode(start)]
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

    const outgoingArcs = graph.arcs.filter(({ from }) => from === current.id)
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
      ? graph.nodes.map((node) => ({ ...node, cost: node.cost ?? 0 }))
      : Object.entries(graph.nodes).map(([key, value]) => ({
          id: key,
          position: value,
          cost: 0,
        })),
    arcs: graph.arcs.map((arc) => ({ ...arc, cost: arc.cost ?? 0 })),
  }
}

function createFindNode(graph) {
  return (id) => graph.nodes.find((node) => node.id === id)
}
