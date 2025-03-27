import draw from "@inglorious/ui/canvas/character.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

export function enableCharacter() {
  return (type) => extend(type, { draw })
}
