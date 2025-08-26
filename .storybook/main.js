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

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },

  docs: {},

  stories: [
    "../docs/quick-start/quick-start.mdx",
    "../docs/engine.mdx",
    "../docs/**/*.mdx",
    "../docs/**/*.stories.@(js|jsx|ts|tsx)",
  ],
}

export default config
