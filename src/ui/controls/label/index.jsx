import classes from './label.module.scss'

export default function Label({ instance }) {
  const { position, value, ...rest } = instance

  const [x, , z] = position

  return (
    <label
      {...rest}
      className={classes.label}
      style={{ '--x': `${x}px`, '--z': `${z}px` }}
    >
      {value}
    </label>
  )
}
