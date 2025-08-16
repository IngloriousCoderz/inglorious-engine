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
    "../docs/quick-start.mdx",
    "../docs/engine.mdx",
    "../docs/**/*.mdx",
    "../docs/**/*.stories.@(js|jsx|ts|tsx)",
  ],
}

export default config
