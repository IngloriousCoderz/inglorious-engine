import AnimationFrameLoop from './animation-frame'
import ElapsedLoop from './elapsed'
import FixedLoop from './fixed'
import FlashLoop from './flash'
import LagLoop from './lag'

// @see https://gameprogrammingpatterns.com/game-loop.html

export default {
  flash: FlashLoop,
  fixed: FixedLoop,
  elapsed: ElapsedLoop,
  lag: LagLoop,
  animationFrame: AnimationFrameLoop,
}
