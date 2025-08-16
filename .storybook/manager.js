import { addons } from "@storybook/manager-api"

import theme from "./theme"

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: [
      "engine",
      "ai",
      "collision",
      "image",
      "input",
      "player",
      "recipes",
      "ui",
      "utils",
    ],
  },
  initialActive: "sidebar",
})

// Redirect to quick-start by default
if (typeof window !== "undefined" && !window.location.hash) {
  window.location.hash = "#/docs-quick-start--docs"
}
