export function keyboardType() {
  let handleKeyDown, handleKeyUp

  return {
    keyboard: {
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
        instance[event.payload] = true

        notify({
          id: 'input:press',
          payload: { id: 0, button: event.payload },
        })
      },

      'keyboard:keyUp'(instance, event, { notify }) {
        instance[event.payload] = false

        notify({
          id: 'input:release',
          payload: { id: 0, button: event.payload },
        })
      },
    },
  }
}

export function keyboardInstance() {
  return {
    keyboard: { type: 'keyboard' },
  }
}

function createKeyboardHandler(id, { notify }) {
  return (event) => {
    event.stopPropagation()
    notify({ id, payload: event.code })
  }
}
