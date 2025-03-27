import draw from "@inglorious/ui/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

export function enablePlatform() {
  return (type) => extend(type, { draw })
}
