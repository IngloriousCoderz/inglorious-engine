import { createRequire } from "node:module"
import { dirname, join } from "node:path"
const require = createRequire(import.meta.url)
/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@chromatic-com/storybook"),
    getAbsolutePath("@storybook/addon-docs"),
  ],

  docs: {},

  stories: [
    "../src/quick-start/quick-start.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
}

export default config

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")))
}
