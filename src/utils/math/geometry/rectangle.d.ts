import { Rectangle, Platform } from "./types"

/**
 * Determines whether a rectangle intersects with a platform in 3D space.
 *
 * @param rectangle - The rectangle defined by its position (top-left-front corner) and size (width, height, depth).
 * @param platform - The platform defined by its position (top-left-front corner) and size (extension, elevation, thickness).
 * @returns `true` if the rectangle intersects with the platform, otherwise `false`.
 */
export declare function intersectsPlatform(
  rectangle: Rectangle,
  platform: Platform,
): boolean
