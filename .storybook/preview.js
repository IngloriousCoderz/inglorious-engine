/** @type { import('@storybook/react').Preview } */
import "./style.css"
import theme from "./theme"

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme,
    },
  },
}

export default preview
