// geometry

/**
 * Represents a point in 3D space using a readonly tuple of numbers.
 * @public
 */
export type Point = readonly [number, number, number] // [x, y, z]

/**
 * Represents the dimensions of an object in 3D space.
 * @public
 */
export type Size = readonly [number, number, number] // [width, height, depth]

/**
 * Represents a line in 2D space in the form `ax + by + c = 0`.
 * @public
 */
export type Line = readonly [number, number, number] // [a, b, c]

/**
 * Represents a circle with a position and radius.
 * @public
 */
export interface Circle {
  /** The center point of the circle. */
  position: Point
  /** The radius of the circle. */
  radius: number
}

/**
 * Represents a rectangle with a position and size.
 * @public
 */
export interface Rectangle {
  /** The top-left corner point of the rectangle. */
  position: Point
  /** The dimensions of the rectangle. */
  size: Size
}

/**
 * Represents a platform, typically for physics or collision detection.
 * @public
 */
export interface Platform {
  /** The position of the platform. */
  position: Point
  /** The dimensions of the platform. */
  size: Size
}

/**
 * Represents a line segment defined by two points.
 * @public
 */
export interface Segment {
  /** The starting point of the segment. */
  from: Point
  /** The ending point of the segment. */
  to: Point
}

// linear algebra

/**
 * A nominal type brand to identify vector types.
 * This prevents accidental assignment of a plain number array to a vector.
 * @internal
 */
type IsVector = {
  readonly __isVector__: true
}

/** A generic, dynamically-sized vector. */
export type Vector = IsVector & readonly number[]

/** A 2-dimensional vector. */
export type Vector2 = IsVector & readonly [number, number]

/** A 3-dimensional vector. */
export type Vector3 = IsVector & readonly [number, number, number]

/** A 4-dimensional vector, often used for quaternions. */
export type Quaternion = IsVector & readonly [number, number, number, number]

/** A 7-dimensional vector. */
export type Vector7 = IsVector &
  readonly [number, number, number, number, number, number, number]
