const ONE_SECOND = 1000

let shouldStop

export async function start(engine) {
  shouldStop = false
  let previousTime = Date.now()

  while (!shouldStop) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    // engine.processInput()
    engine.update(elapsed / ONE_SECOND)
    // engine.render(engine)

    previousTime = currentTime
  }
}

export function stop() {
  shouldStop = true
}
