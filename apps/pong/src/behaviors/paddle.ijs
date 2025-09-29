export const paddle = {
  create(entity, entityId) {
    if (entityId !== entity.id) return

    entity.initialPosition = entity.position
  },

  done(entity) {
    entity.position = entity.initialPosition
  },
}
