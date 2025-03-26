import { Segment, Point, Circle } from "./types"

/**
 * Calculates the coefficients [a, b, c] of the line equation ax + bz + c = 0
 * for a given segment in 2D space.
 *
 * @param segment - The segment defined by its start (`from`) and end (`to`) points.
 * @returns An array [a, b, c] representing the line equation.
 */
export declare function coefficients(segment: Segment): [number, number, number]

/**
 * Finds the closest point on a segment to a given point in 3D space.
 *
 * @param segment - The segment defined by its start (`from`) and end (`to`) points.
 * @param point - The point in 3D space represented as [x, y, z].
 * @returns The closest point on the segment to the given point.
 */
export declare function closestPoint(segment: Segment, point: Point): Point

/**
 * Calculates the shortest distance from a point to a segment in 3D space.
 *
 * @param segment - The segment defined by its start (`from`) and end (`to`) points.
 * @param point - The point in 3D space represented as [x, y, z].
 * @returns The shortest distance from the point to the segment.
 */
export declare function distanceFromPoint(
  segment: Segment,
  point: Point,
): number

/**
 * Determines whether a segment intersects with the perimeter of a circle.
 *
 * @param segment - The segment defined by its start (`from`) and end (`to`) points.
 * @param circle - The circle defined by its position (center) and radius.
 * @returns `true` if the segment intersects the circle's perimeter, otherwise `false`.
 */
export declare function intersectsCircle(
  segment: Segment,
  circle: Circle,
): boolean
