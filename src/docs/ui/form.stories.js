import Game from "@inglorious/ui/react/game/index.jsx"

export default {
  title: "UI/Form",
  component: Game,
}

export const Default = {
  args: {
    config: {
      types: {
        form: {},
      },

      instances: {
        login: {
          type: "form",
          position: [150, 0, 600 - 160],
          fields: {
            username: {
              label: "Username",
            },
            password: {
              label: "Password",
              inputType: "password",
            },
          },
          groups: {
            extraInfo: {
              title: "Extra Info",
              fields: {
                kids: {
                  label: "How many kids do you have?",
                  inputType: "number",
                  defaultValue: 0,
                },
                dogs: {
                  label: "Do you like dogs?",
                  inputType: "checkbox",
                  defaultValue: true,
                },
                cats: {
                  label: "Do you like cats?",
                  inputType: "checkbox",
                  defaultValue: true,
                },
              },
            },
          },
        },
      },
    },
  },
}
