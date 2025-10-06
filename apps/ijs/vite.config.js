import { defineConfig } from "vite"
import babel from "vite-plugin-babel"

export default defineConfig({
  plugins: [
    babel({
      include: "src/**",
      filter: /\.(js|ijs)$/,

      babelConfig: {
        presets: ["@inglorious/inglorious-script"],
      },
    }),
  ],
})
