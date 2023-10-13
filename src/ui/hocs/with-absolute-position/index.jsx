import classes from './with-absolute-position.module.scss'

export function withAbsolutePosition(Component) {
  return function AbsolutePosition(props) {
    const [, , , height] = props.config.bounds
    const { position } = props.instance

    if (!position) {
      return <Component {...props} />
    }

    const [x, y, z] = position

    return (
      <div
        className={classes.withAbsolutePosition}
        style={{ '--x': `${x}px`, '--y': `${height - y - z}px` }}
      >
        <Component {...props} />
      </div>
    )
  }
}
