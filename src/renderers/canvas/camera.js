import { renderRectangle } from "./shapes/rectangle.js"

export function renderCamera(entity, ctx, { api }) {
  const { devMode } = api.getEntity("game")

  if (devMode) {
    // In dev mode, we want to see the camera's viewport.
    // We can reuse the rectangle renderer.
    renderRectangle(entity, ctx)
  }
  // In non-dev mode, the camera itself is not rendered;
  // its properties are used by the main CanvasRenderer to transform the scene.
}
