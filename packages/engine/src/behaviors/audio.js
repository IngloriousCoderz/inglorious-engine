export function audio() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const audioBufferCache = new Map()

  return {
    async init(entity) {
      const sounds = entity.sounds || {}

      await Promise.all(
        Object.entries(sounds).map(async ([name, url]) => {
          const response = await fetch(url)
          const arrayBuffer = await response.arrayBuffer()
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
          audioBufferCache.set(name, audioBuffer)
        }),
      )
    },

    playSound(entity, name) {
      const audioBuffer = audioBufferCache.get(name)

      const source = audioContext.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.destination)
      source.start()
    },
  }
}
