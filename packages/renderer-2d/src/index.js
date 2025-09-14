import { rendering } from "./rendering-behavior"
import { renderingSystem } from "./rendering-system"

export function createRenderer(canvas) {
  return {
    types: { renderer: [rendering(canvas)] },
    entities: { renderer: { type: "renderer" } },
    systems: [renderingSystem(canvas)],
  }
}
