import SpriteComponent from './sprite'

export default function Sprite({ type, instance, className, style }) {
  const { states, ...rest } = type.sprite
  const { frames, flip } = states[instance.sprite]

  const { frame } = instance._animation

  return (
    <SpriteComponent
      {...rest}
      flip={flip}
      frame={frames[frame]}
      className={className}
      style={style}
    />
  )
}
