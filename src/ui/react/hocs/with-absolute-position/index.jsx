import classes from "./with-absolute-position.module.scss"

const NO_JUMP = 0

export function withAbsolutePosition(Component) {
  return function AbsolutePosition(props) {
    const [, , , height] = props.instances.game.bounds
    const { position, py = NO_JUMP } = props.instance

    if (!position) {
      return <Component {...props} />
    }

    const [x, y, z] = position

    return (
      <Component
        {...props}
        className={classes.withAbsolutePosition}
        style={{ "--x": `${x}px`, "--y": `${height - y - py - z}px` }}
      />
    )
  }
}
