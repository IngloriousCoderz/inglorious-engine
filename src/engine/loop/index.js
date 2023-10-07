import AnimationFrameLoop from './animation-frame'
import ElapsedLoop from './elapsed'
import FlashLoop from './flash'
import LagLoop from './lag'
import NapLoop from './nap'

// @see https://gameprogrammingpatterns.com/game-loop.html

export default {
  flash: FlashLoop,
  nap: NapLoop,
  elapsed: ElapsedLoop,
  lag: LagLoop,
  animationFrame: AnimationFrameLoop,
}
