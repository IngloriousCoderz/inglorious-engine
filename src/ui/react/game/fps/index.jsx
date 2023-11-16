export const DEFAULT_ACCURACY = 0

const ONE_SECOND = 1

export default function Fps({ type, instance, className, style }) {
  const { accuracy = DEFAULT_ACCURACY } = type
  const { value } = instance._animation

  const fps = ONE_SECOND / value

  return (
    <div className={className} style={style}>
      FPS: {fps.toFixed(accuracy)}
    </div>
  )
}
