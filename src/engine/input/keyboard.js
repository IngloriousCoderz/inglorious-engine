const DEFAULT_ID = 0

export function type() {
  let handleKeyDown, handleKeyUp

  return {
    'game:update'(instance, event, options) {
      handleKeyDown = createKeyboardHandler('keyboard:keyDown', options)
      handleKeyUp = createKeyboardHandler('keyboard:keyUp', options)

      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
    },

    'game:stop'() {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    },

    'keyboard:keyDown'(instance, event, { notify }) {
      const action = instance.mapping[event.payload]
      if (!instance[action]) {
        instance[action] = true
        notify({ id: 'input:press', payload: { id: 0, action } })
      }
    },

    'keyboard:keyUp'(instance, event, { notify }) {
      const action = instance.mapping[event.payload]
      if (instance[action]) {
        instance[action] = false
        notify({ id: 'input:release', payload: { id: 0, action } })
      }
    },
  }
}

export function instance(id = DEFAULT_ID, mapping = {}) {
  return { id: `keyboard${id}`, type: 'keyboard', mapping }
}

function createKeyboardHandler(id, { notify }) {
  return (event) => {
    event.stopPropagation()
    notify({ id, payload: event.code })
  }
}
