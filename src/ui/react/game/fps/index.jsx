import { useEffect, useRef, useState } from 'react'

export const DEFAULT_ACCURACY = 0

const ONE_SECOND = 1
const MILLISECONDS = 1000

export default function Fps({ type, instance }) {
  const { frequency = ONE_SECOND, accuracy = DEFAULT_ACCURACY } = type

  const value = useRef(instance.value)
  useEffect(() => {
    value.current = instance.value
  }, [instance.value])

  const [fps, setFps] = useState(ONE_SECOND / value.current)
  useEffect(() => {
    const id = setInterval(() => {
      setFps(ONE_SECOND / value.current)
    }, frequency * MILLISECONDS)

    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <div>FPS: {fps.toFixed(accuracy)}</div>
}
