const Z = 2

export const paddle = {
  create(entity, entityId) {
    if (entityId !== entity.id) return

    entity.initialPosition = entity.position
  },

  gameOver(entity) {
    entity.position = entity.initialPosition
  },

  entityTouchMove(entity, { targetId, position }) {
    if (targetId !== entity.id) return

    entity.position[Z] = position[Z]
  },
}
