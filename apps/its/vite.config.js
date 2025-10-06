import { defineConfig } from "vite"
import babel from "vite-plugin-babel"

export default defineConfig({
  define: { "process.env.BABEL_TYPES_8_BREAKING": "false" },

  plugins: [
    babel({
      include: "src/**",
      filter: /\.(js|ijs|ts|its)$/,

      babelConfig: {
        presets: [
          "@inglorious/inglorious-script",
          [
            "@babel/preset-typescript",
            {
              isTSX: false,
              allExtensions: true,
              onlyRemoveTypeImports: true,
            },
          ],
        ],
      },
    }),
  ],
})
