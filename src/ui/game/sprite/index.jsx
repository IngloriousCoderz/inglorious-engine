import SpriteComponent from './sprite'

export default function Sprite({ type, instance }) {
  const { states, ...rest } = type.sprite
  const frame = states[instance.spriteState][instance.frame]
  const flip = instance.spriteFlip

  return <SpriteComponent {...rest} flip={flip} frame={frame} />
}
