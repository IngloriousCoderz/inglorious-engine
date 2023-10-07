import classes from './label.module.scss'

export default function Label({ id, instance }) {
  const { value, ...rest } = instance

  return (
    <label {...rest} htmlFor={id} className={classes.label}>
      {value}
    </label>
  )
}
