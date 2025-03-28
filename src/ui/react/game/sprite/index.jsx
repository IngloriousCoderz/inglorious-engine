import SpriteComponent from "./sprite.jsx"

export default function Sprite({ instance, className, style }) {
  const { states, state, value, ...rest } = instance.sprite
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
