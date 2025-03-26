import { Circle, Platform, Point, Rectangle } from "./types"

/**
 * Checks if a circle intersects with a point.
 * @param circle - The circle to check.
 * @param point - The point to check.
 * @returns True if the point intersects the circle, false otherwise.
 */
export declare function intersectsPoint(circle: Circle, point: Point): boolean

/**
 * Checks if two circles intersect.
 * @param circle1 - The first circle.
 * @param circle2 - The second circle.
 * @returns True if the circles intersect, false otherwise.
 */
export declare function intersectsCircle(
  circle1: Circle,
  circle2: Circle,
): boolean

/**
 * Checks if a circle intersects with a rectangle.
 * @param circle - The circle to check.
 * @param rectangle - The rectangle to check.
 * @returns True if the circle intersects the rectangle, false otherwise.
 */
export declare function intersectsRectangle(
  circle: Circle,
  rectangle: Rectangle,
): boolean

/**
 * Checks if a circle intersects with a platform.
 * @param circle - The circle to check.
 * @param platform - The platform to check.
 * @returns True if the circle intersects the platform, false otherwise.
 */
export declare function intersectsPlatform(
  circle: Circle,
  platform: Platform,
): boolean
