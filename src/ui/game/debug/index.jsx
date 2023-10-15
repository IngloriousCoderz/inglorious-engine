import { toString } from '@ezpz/utils/math/linear-algebra/vector'
import { useState } from 'react'
import { useEffect } from 'react'

import classes from './debug.module.scss'

const DECIMALS = 1

export default function Debug({ config, instance }) {
  const [, , , height] = config.bounds
  const x = 600
  const z = 600

  const [maxVy, setMaxVy] = useState(instance.vy)
  useEffect(() => {
    setMaxVy((maxVy) => Math.max(maxVy, instance.vy))
  }, [instance.vy])

  return (
    <div
      className={classes.debug}
      style={{ '--x': `${x}px`, '--y': `${height - z}px` }}
    >
      <div>Acceleration: {toString(instance.acceleration)}</div>
      <div>Velocity: {toString(instance.velocity)}</div>
      <div>Position: {toString(instance.position)}</div>
      <div>ay: {instance.ay.toFixed(DECIMALS)}</div>
      <div>max vy: {maxVy.toFixed(DECIMALS)}</div>
      <div>py: {instance.py.toFixed(DECIMALS)}</div>
    </div>
  )
}
