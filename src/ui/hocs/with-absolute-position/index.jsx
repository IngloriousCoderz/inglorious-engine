import classes from './with-absolute-position.module.scss'

export function withAbsolutePosition(Component) {
  return function AbsolutePosition(props) {
    const { position } = props.instance

    if (!position) {
      return <Component {...props} />
    }

    const [x, , z] = position

    return (
      <div
        className={classes.withAbsolutePosition}
        style={{ '--x': `${x}px`, '--z': `${z}px` }}
      >
        <Component {...props} />
      </div>
    )
  }
}
