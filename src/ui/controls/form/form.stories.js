import Game from '../../game'

export default {
  title: 'Controls/Form',
  component: Game,
}

export const Default = {
  args: {
    config: {
      bounds: [0, 0, 800, 600],
      types: {
        form: {},
      },
      state: {
        instances: {
          login: {
            type: 'form',
            fields: {
              username: {
                label: 'Username',
              },
              password: {
                label: 'Password',
                inputType: 'password',
              },
            },
            groups: {
              extraInfo: {
                title: 'Extra Info',
                fields: {
                  kids: {
                    label: 'How many kids do you have?',
                    inputType: 'number',
                    defaultValue: 0,
                  },
                  dogs: {
                    label: 'Do you like dogs?',
                    inputType: 'checkbox',
                    defaultValue: true,
                  },
                  cats: {
                    label: 'Do you like cats?',
                    inputType: 'checkbox',
                    defaultValue: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}