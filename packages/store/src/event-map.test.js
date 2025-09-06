import { performance } from "node:perf_hooks"

import { expect, test, vi } from "vitest"

import { EventMap } from "./event-map.js"

test("constructor should initialize the event map from types and entities", () => {
  const types = {
    player: {
      update: () => {},
      fire: () => {},
    },
    enemy: {
      update: () => {},
    },
    item: {}, // Type with no events
  }
  const entities = {
    player1: { type: "player" },
    player2: { type: "player" },
    enemy1: { type: "enemy" },
    item1: { type: "item" },
    ghost1: { type: "ghost" }, // Type that doesn't exist
  }

  const eventMap = new EventMap(types, entities)

  expect(eventMap.getEntitiesForEvent("update")).toEqual(
    new Set(["player1", "player2", "enemy1"]),
  )
  expect(eventMap.getEntitiesForEvent("fire")).toEqual(
    new Set(["player1", "player2"]),
  )

  // 'item' type has no events, so it shouldn't be in the map
  expect(eventMap.getEntitiesForEvent("item")).toEqual(new Set())
  // 'ghost' type doesn't exist, so it should be ignored
  expect(eventMap.getEntitiesForEvent("ghost")).toEqual(new Set())
})

test("addEntity should add an entity to the correct event sets", () => {
  const types = {
    player: {
      update: () => {},
      jump: () => {},
    },
  }
  const eventMap = new EventMap(types, {})

  eventMap.addEntity("player1", types.player)

  expect(eventMap.getEntitiesForEvent("update")).toEqual(new Set(["player1"]))
  expect(eventMap.getEntitiesForEvent("jump")).toEqual(new Set(["player1"]))

  // Add another entity of the same type
  eventMap.addEntity("player2", types.player)
  expect(eventMap.getEntitiesForEvent("update")).toEqual(
    new Set(["player1", "player2"]),
  )
  expect(eventMap.getEntitiesForEvent("jump")).toEqual(
    new Set(["player1", "player2"]),
  )
})

test("removeEntity should remove an entity from its event sets", () => {
  const types = {
    player: {
      update: () => {},
      fire: () => {},
    },
  }
  const entities = {
    player1: { type: "player" },
    player2: { type: "player" },
  }
  const eventMap = new EventMap(types, entities)

  eventMap.removeEntity("player1", types.player)

  expect(eventMap.getEntitiesForEvent("update")).toEqual(new Set(["player2"]))
  expect(eventMap.getEntitiesForEvent("fire")).toEqual(new Set(["player2"]))

  // Removing a non-existent entity should not throw an error
  expect(() => eventMap.removeEntity("player3", types.player)).not.toThrow()
})

test("getEntitiesForEvent should return the correct set of entities for an event", () => {
  const types = {
    player: { update: () => {} },
    enemy: { update: () => {} },
  }
  const entities = {
    player1: { type: "player" },
    enemy1: { type: "enemy" },
  }
  const eventMap = new EventMap(types, entities)

  const updateEntities = eventMap.getEntitiesForEvent("update")
  expect(updateEntities).toEqual(new Set(["player1", "enemy1"]))

  const fireEntities = eventMap.getEntitiesForEvent("fire")
  expect(fireEntities).toEqual(new Set())
})

test("EventMap provides a significant performance benefit for event handling", async () => {
  const ENTITY_COUNT = 10000
  const { entities, types } = createTestEntities(ENTITY_COUNT)
  const eventMap = new EventMap(types, entities)

  // We'll use a mock function to ensure the "work" is consistent
  const updateHandler = vi.fn()
  types.updater.update = updateHandler

  // --- Simulation A: The Old Way (iterating all entities) ---
  const oldWayStartTime = performance.now()
  for (const id in entities) {
    const entity = entities[id]
    const type = types[entity.type]
    if (type.update) {
      type.update()
    }
  }
  const oldWayTime = performance.now() - oldWayStartTime

  // Reset the mock for the next simulation
  updateHandler.mockClear()

  // --- Simulation B: The New Way (using EventMap) ---
  const newWayStartTime = performance.now()
  const updaterIds = eventMap.getEntitiesForEvent("update")
  for (const id of updaterIds) {
    const entity = entities[id]
    const type = types[entity.type]
    type.update()
  }
  const newWayTime = performance.now() - newWayStartTime

  // Assertions to verify correctness
  expect(oldWayTime).toBeGreaterThan(newWayTime)
  expect(updateHandler).toHaveBeenCalledTimes(updaterIds.size)
})

// Helper function to create a large set of test entities
function createTestEntities(count) {
  const entities = {}
  const types = {}
  // 10% of entities will have a mock 'update' handler
  const updaterType = { update: vi.fn() }
  const staticType = {}

  for (let i = 0; i < count; i++) {
    const isUpdater = Math.random() < 0.1
    const typeId = isUpdater ? "updater" : "static"
    entities[`entity-${i}`] = { id: `entity-${i}`, type: typeId }
  }
  types["updater"] = updaterType
  types["static"] = staticType

  return { entities, types }
}
