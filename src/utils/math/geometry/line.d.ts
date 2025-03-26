import { Line, Point, Circle } from "./types"

/**
 * Calculates the shortest distance from a point to a line in 2D space.
 *
 * @param line - The line represented by the equation ax + bz + c = 0, where `line` is [a, b, c].
 * @param point - The point in 3D space represented as [x, y, z].
 * @returns The shortest distance from the point to the line.
 */
export declare function distanceFromPoint(line: Line, point: Point): number

/**
 * Determines whether a line intersects with the perimeter of a circle.
 *
 * @param line - The line represented by the equation ax + bz + c = 0, where `line` is [a, b, c].
 * @param circle - The circle defined by its position (center) and radius.
 * @returns `true` if the line intersects the circle's perimeter, otherwise `false`.
 */
export declare function intersectsCircle(line: Line, circle: Circle): boolean
