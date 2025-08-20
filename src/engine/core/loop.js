import { AnimationFrameLoop } from "./loops/animation-frame.js"
import { ElapsedLoop } from "./loops/elapsed.js"
import { FixedLoop } from "./loops/fixed.js"
import { FlashLoop } from "./loops/flash.js"
import { LagLoop } from "./loops/lag.js"

// @see https://gameprogrammingpatterns.com/game-loop.html

export default {
  flash: FlashLoop,
  fixed: FixedLoop,
  elapsed: ElapsedLoop,
  lag: LagLoop,
  animationFrame: AnimationFrameLoop,
}
