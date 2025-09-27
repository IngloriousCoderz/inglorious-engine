import { fps as fpsBehavior } from "@inglorious/engine/behaviors/fps"
import { renderFps } from "@inglorious/renderer-2d/fps"

export const fps = [{ render: renderFps }, fpsBehavior({ accuracy: 0 })]
