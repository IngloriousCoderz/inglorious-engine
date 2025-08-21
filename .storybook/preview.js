/** @type { import('@storybook/react-vite').Preview } */
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
    layout: "centered",
    options: {
      storySort: {
        order: ["Docs"],
      },
    },
  },
  argTypes: { renderer: { control: "radio", options: ["canvas", "react"] } },
  args: { renderer: "canvas" },
}

// Set default story to quick-start
preview.parameters.initialStory = "docs-quick-start--docs"

export default preview
