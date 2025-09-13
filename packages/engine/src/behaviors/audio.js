const DEFAULT_VOLUME = 1

export function audio() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const audioBufferCache = new Map()
  const activeSources = new Map()

  return {
    async init(entity) {
      const sounds = entity.sounds || {}

      await Promise.all(
        Object.entries(sounds).map(async ([name, { url }]) => {
          const response = await fetch(url)
          const arrayBuffer = await response.arrayBuffer()
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
          audioBufferCache.set(name, audioBuffer)
        }),
      )
    },

    soundPlay(entity, name) {
      const { volume = DEFAULT_VOLUME, loop } = entity.sounds[name]
      const audioBuffer = audioBufferCache.get(name)

      const source = audioContext.createBufferSource()
      const gainNode = audioContext.createGain()

      source.buffer = audioBuffer
      gainNode.gain.value = volume

      source.connect(gainNode)
      gainNode.connect(audioContext.destination)

      source.loop = loop
      source.start()

      activeSources.set(name, source)
    },

    soundStop(entity, name) {
      const source = activeSources.get(name)
      source?.stop()
      activeSources.delete(name)
    },

    stop() {
      for (const source of activeSources.values()) {
        source.stop()
      }
      activeSources.clear()
    },
  }
}
