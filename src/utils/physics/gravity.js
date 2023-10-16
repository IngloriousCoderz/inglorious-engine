/* eslint-disable no-magic-numbers */

/*
@see https://youtu.be/hG9SzQxaCm8

Projectile equations:
1. a(t) = g
2. v(t) = g*t + v_0
3. y(t) = 1/2*g*t^2 + v_0*t + y_0

Known values:
y_0 = 0
v(t_h) = 0 -> 2. 0 = g*t_h + v_0 -> v_0 = -g*t_h
y_h = h -> 3. h = 1/2*g*t_h^2 (-g*t_h)*t_h = -1/2*g*t_h^2 -> g = -2*h/t_h^2

v_0 = -g*t_h = (-2*h/t_h^2)*t_h = 2*h/t_h
*/

/*
Transforming time into space:
t_h = x_h/v_x
-> v0 = 2*h/t_h = 2*h*v_x/x_h
-> g = -2*h/t_h^2 = -2*h*v_x^2/x_h^2
*/

/*
Integration:
v_y += a_y*dt
y += v_y*dt + 1/2*a_y*dt*dt
*/

const NO_VELOCITY = 0
const NO_POSITION = 0

const NO_JUMP = 0
const NO_LEAP = 0
const NO_SPEED = 0
const DEFAULT_OPTIONS = { dt: 0 }

export function applyGravity(
  {
    maxJump = NO_JUMP,
    maxLeap = NO_LEAP,
    maxSpeed = NO_SPEED,
    vy = NO_VELOCITY,
    py = NO_POSITION,
  },
  options = DEFAULT_OPTIONS
) {
  if (!maxLeap) {
    throw new Error('Please specify max leap distance (maxLeap)')
  }

  const { dt } = options
  const ay = (-2 * maxJump * maxSpeed ** 2) / maxLeap ** 2
  vy += ay * dt
  py += vy * dt + 0.5 * ay * dt * dt

  return { ay, vy, py }
}
