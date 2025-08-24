export function calculateLandingPosition(
  entity,
  target,
  collisionGroup = "platform",
) {
  const entityShape = entity.collisions[collisionGroup]?.shape

  if (CalculatePY[entityShape]) {
    return CalculatePY[entityShape](entity, target, collisionGroup)
  }

  return calculatePYForRectangle(entity, target, collisionGroup)
}

function calculatePYForCircle(entity, target, collisionGroup) {
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  const [, targetY] = target.position
  const entityRadius =
    entity.collisions[collisionGroup]?.radius ?? entity.radius
  return targetY + targetHeight + entityRadius
}

function calculatePYForRectangle(entity, target, collisionGroup) {
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  const [, targetY] = target.position
  return targetY + targetHeight
}

const CalculatePY = {
  circle: calculatePYForCircle,
  rectangle: calculatePYForRectangle,
}
