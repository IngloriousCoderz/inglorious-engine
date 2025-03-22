import { merge } from '@inglorious/utils/data-structures/objects.js'

const DEFAULT_PARAMS = {
  id: 0,
}

export function enableKeyboard(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  let handleKeyDown, handleKeyUp

  return (type) => ({
    ...type,

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
        notify({ id: 'input:press', payload: { id: params.id, action } })
      }
    },

    'keyboard:keyUp'(instance, event, { notify }) {
      const action = instance.mapping[event.payload]
      if (instance[action]) {
        instance[action] = false
        notify({ id: 'input:release', payload: { id: params.id, action } })
      }
    },
  })
}

export function createKeyboard(id = DEFAULT_PARAMS.id, mapping = {}) {
  return { id: `keyboard${id}`, type: 'keyboard', mapping }
}

function createKeyboardHandler(id, { notify }) {
  return (event) => {
    event.stopPropagation()
    notify({ id, payload: event.code })
  }
}
