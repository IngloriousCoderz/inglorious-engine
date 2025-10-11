/**
 * @typedef {Object.<string, any>} Type - An object representing an augmented entity type.
 * @typedef {Object.<string, any>} Entity - An object representing a entity.
 */

/**
 * A class to manage the mapping of event names to the entity IDs that handle them.
 * This is used for optimized event handling.
 */
export class EventMap {
  /**
   * Creates an instance of EventMap and initializes it with entities and their types.
   *
   * @param {Object.<string, Type>} types - An object containing all augmented type definitions.
   * @param {Object.<string, Entity>} entities - An object containing all entities.
   */
  constructor(types, entities) {
    /**
     * The internal map where keys are event names and values are Sets of entity IDs.
     *
     * @type {Object.<string, Set<string>>}
     */
    this.map = {}

    for (const entityId in entities) {
      const entity = entities[entityId]
      const type = types[entity.type]
      if (type) {
        this.addEntity(entityId, type)
      }
    }
  }

  /**
   * Adds an entity's ID to the Sets for all event handlers defined in its type.
   * This should be called when a new entity is created or its type is morphed.
   *
   * @param {string} entityId - The ID of the entity.
   * @param {Type} type - The augmented type object of the entity.
   */
  addEntity(entityId, type) {
    for (const eventName in type) {
      if (!this.map[eventName]) {
        this.map[eventName] = new Set()
      }
      this.map[eventName].add(entityId)
    }
  }

  /**
   * Removes an entity's ID from the Sets for all event handlers defined in its type.
   * This should be called when an entity is removed or its type is morphed.
   *
   * @param {string} entityId - The ID of the entity.
   * @param {Type} type - The augmented type object of the entity.
   */
  removeEntity(entityId, type) {
    for (const eventName in type) {
      const entitySet = this.map[eventName]
      if (entitySet) {
        entitySet.delete(entityId)
      }
    }
  }

  /**
   * Retrieves the Set of entity IDs that are subscribed to a given event.
   *
   * @param {string} eventName - The name of the event (e.g., 'update', 'fire').
   * @returns {Set<string>} A Set of entity IDs. Returns an empty Set if no entities are found.
   */
  getEntitiesForEvent(eventName) {
    return this.map[eventName] || new Set()
  }
}
