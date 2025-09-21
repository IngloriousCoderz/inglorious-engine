import { defineConfig } from "vite"
import babel from "vite-plugin-babel"

export default defineConfig({
  plugins: [
    babel({
      include: "src/**",
      filter: /\.(js|jsx|ts|tsx|ijs)$/,

      babelConfig: {
        presets: ["@inglorious/babel-preset-inglorious-script"],
      },
    }),
  ],
})
