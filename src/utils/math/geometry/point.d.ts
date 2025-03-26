import { Line, Point, Rectangle, Size } from "./types"

/**
 * Calculates the distance from a point to a line.
 * @param point - The point as a 3D coordinate [x, y, z].
 * @param line - The line to calculate the distance from.
 * @returns The distance from the point to the line.
 */
export declare function getDistanceFromLine(point: Point, line: Line): number

/**
 * Checks if two points intersect.
 * @param point1 - The first point as a 3D coordinate [x, y, z].
 * @param point2 - The second point as a 3D coordinate [x, y, z].
 * @returns True if the points intersect, false otherwise.
 */
export declare function intersectsPoint(point1: Point, point2: Point): boolean

/**
 * Checks if a point intersects with a circle.
 * @param point - The point as a 3D coordinate [x, y, z].
 * @param circle - The circle with a position and radius.
 * @returns True if the point intersects the circle, false otherwise.
 */
export declare function intersectsCircle(point: Point, circle: Circle): boolean

/**
 * Checks if a point intersects with a rectangle.
 * @param point - The point as a 3D coordinate [x, y, z].
 * @param rectangle - The rectangle with a position and size.
 * @returns True if the point intersects the rectangle, false otherwise.
 */
export declare function intersectsRectangle(
  point: Point,
  rectangle: Rectangle,
): boolean
