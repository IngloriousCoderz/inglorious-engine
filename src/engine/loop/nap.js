const ONE_SECOND = 1000

let shouldStop

export async function start(engine, msPerUpdate) {
  shouldStop = false
  let previousTime = Date.now()

  while (!shouldStop) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    engine.processInput()
    engine.update(elapsed / ONE_SECOND)
    engine.render(engine, msPerUpdate)

    previousTime = currentTime
    await sleep(Date.now() - currentTime + msPerUpdate)
  }
}

export function stop() {
  shouldStop = true
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
