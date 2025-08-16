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
    layout: "centered",
  },
  argTypes: { ui: { control: "radio", options: ["canvas", "react"] } },
  args: { ui: "canvas" },
}

// Set default story to quick-start
preview.parameters.initialStory = "docs-quick-start--docs"

export default preview
