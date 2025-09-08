/** @type { import('@storybook/react-vite').Preview } */

import "../src/styles/tailwind.css"

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
