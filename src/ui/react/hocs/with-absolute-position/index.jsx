import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

import classes from "./with-absolute-position.module.scss"

export function withAbsolutePosition(Component) {
  return function AbsolutePosition(props) {
    const [, , , screenHeight] = props.instances.game.bounds
    const { position = zero() } = props.instance

    const [x, y, z] = position

    return (
      <Component
        {...props}
        className={classes.withAbsolutePosition}
        style={{ "--x": `${x}px`, "--y": `${screenHeight - y - z}px` }}
      />
    )
  }
}
