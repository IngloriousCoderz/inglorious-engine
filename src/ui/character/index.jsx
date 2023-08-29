import classes from './character.module.scss'

export default function Character({ instance }) {
  const { position, orientation } = instance
  const [x, , z] = position

  return (
    <div
      className={classes.character}
      style={{
        '--x': `${x}px`,
        '--z': `${z}px`,
        '--angle': `${orientation}rad`,
      }}
    />
  )
}
