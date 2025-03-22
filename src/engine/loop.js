import AnimationFrameLoop from "./loop/animation-frame.js"
import ElapsedLoop from "./loop/elapsed.js"
import FixedLoop from "./loop/fixed.js"
import FlashLoop from "./loop/flash.js"
import LagLoop from "./loop/lag.js"

// @see https://gameprogrammingpatterns.com/game-loop.html

export default {
  flash: FlashLoop,
  fixed: FixedLoop,
  elapsed: ElapsedLoop,
  lag: LagLoop,
  animationFrame: AnimationFrameLoop,
}
