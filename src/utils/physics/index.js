/* eslint-disable no-magic-numbers */

import { magnitude, setMagnitude } from '../math/linear-algebra/vector'

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

export function applyGravity(instance, { dt }) {
  const v = magnitude(instance.velocity)

  instance.ay = (-2 * instance.maxJump * v ** 2) / instance.maxLeap ** 2
  instance.vy += instance.ay * dt
  instance.py += instance.vy * dt + 0.5 * instance.ay * dt * dt

  return instance
}

export function applyFriction(instance, { dt }) {
  const length = magnitude(instance.velocity)

  instance.velocity = length
    ? setMagnitude(instance.velocity, length - instance.friction * dt)
    : instance.velocity

  return instance
}
