import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle"

export const paddle = [{ render: renderRectangle }, modernControls(), clamped()]
