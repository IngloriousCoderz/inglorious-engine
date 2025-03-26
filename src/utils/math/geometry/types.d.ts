export type Point = [number, number, number] // [x, y, z]
export type Size = [number, number, number] // [width, height, depth]
export type Line = [number, number, number] // [a, b, c]

export interface Circle {
  position: Point
  radius: number
}

export interface Rectangle {
  position: Point
  size: Size
}

export interface Platform {
  position: Point
  size: Size
}

export interface Segment {
  from: Point
  to: Point
}
