/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/test",
    "@chromatic-com/storybook",
  ],

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  docs: {},

  stories: [
    "../src/docs/quick-start.mdx",
    "../src/docs/engine.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
}

export default config
