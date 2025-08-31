const HALF = 2

export function calculateLandingPosition(
  entity,
  target,
  collisionGroup = "platform",
) {
  const entityShape = entity.collisions[collisionGroup]?.shape

  if (CalculatePY[entityShape]) {
    return CalculatePY[entityShape](entity, target, collisionGroup)
  }

  return calculatePYForPoint(entity, target, collisionGroup)
}

function calculatePYForPoint(entity, target, collisionGroup) {
  const [, targetY] = target.position
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  return targetY + targetHeight / HALF
}

function calculatePYForCircle(entity, target, collisionGroup) {
  const entityRadius = entity.collisions[collisionGroup].radius ?? entity.radius

  const [, targetY] = target.position
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  return targetY + targetHeight / HALF + entityRadius
}

function calculatePYForRectangle(entity, target, collisionGroup) {
  const [, entityHeight] = entity.collisions[collisionGroup].size ?? entity.size

  const [, targetY] = target.position
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  return targetY + targetHeight / HALF + entityHeight / HALF
}

const CalculatePY = {
  point: calculatePYForPoint,
  circle: calculatePYForCircle,
  rectangle: calculatePYForRectangle,
}
