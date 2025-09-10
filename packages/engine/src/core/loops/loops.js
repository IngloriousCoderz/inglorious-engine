import { AnimationFrameLoop } from "./animation-frame.js"
import { ElapsedLoop } from "./elapsed.js"
import { FixedLoop } from "./fixed.js"
import { FlashLoop } from "./flash.js"
import { LagLoop } from "./lag.js"

// @see https://gameprogrammingpatterns.com/game-loop.html

export const Loops = {
  flash: FlashLoop,
  fixed: FixedLoop,
  elapsed: ElapsedLoop,
  lag: LagLoop,
  animationFrame: AnimationFrameLoop,
}
