/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],

  docs: {},

  stories: [
    "../src/quick-start/quick-start.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
}

export default config
