import classes from './with-absolute-position.module.scss'

const NO_JUMP = 0

export function withAbsolutePosition(Component) {
  return function AbsolutePosition(props) {
    const [, , , height] = props.config.bounds
    const { position, py = NO_JUMP } = props.instance

    if (!position) {
      return <Component {...props} />
    }

    const [x, , z] = position

    return (
      <div
        className={classes.withAbsolutePosition}
        style={{ '--x': `${x}px`, '--y': `${height - py - z}px` }}
      >
        <Component {...props} />
      </div>
    )
  }
}
