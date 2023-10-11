import { mod } from '@ezpz/utils/math/numbers'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import SpriteComponent from './sprite'

const MILLISECONDS = 1000
const FIRST_FRAME = 0
const NEXT_FRAME = 1
const LAST_FRAME = 1

export default function Sprite({ type, instance }) {
  const notify = useDispatch()
  const interval = useRef()

  const { speed, states, ...rest } = type.sprite
  const { frames, flip } = states[instance.sprite]

  const [frame, setFrame] = useState(FIRST_FRAME)

  useEffect(() => {
    clearInterval(interval.current)
    setFrame(FIRST_FRAME)

    interval.current = setInterval(() => {
      setFrame((frame) => mod(frame + NEXT_FRAME, frames.length))
    }, speed * MILLISECONDS)

    return () => clearInterval(interval.current)
  }, [instance.sprite, frames.length, speed])

  useEffect(() => {
    if (frame === frames.length - LAST_FRAME) {
      notify({ id: 'sprite:animationEnd' })
    }
  }, [frame, frames.length, notify])

  return <SpriteComponent {...rest} flip={flip} frame={frames[frame]} />
}
