import SpriteComponent from './sprite.jsx'

export default function Sprite({ type, instance, className, style }) {
  const { states, ...rest } = type.sprite
  const { state, value } = instance.sprite
  const { frames, flip } = states[state]

  return (
    <SpriteComponent
      {...rest}
      flip={flip}
      frame={frames[value]}
      className={className}
      style={style}
    />
  )
}
