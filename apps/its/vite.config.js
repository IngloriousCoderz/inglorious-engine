import { defineConfig } from "vite"
import babel from "vite-plugin-babel"

export default defineConfig({
  // @see https://github.com/vitejs/vite/issues/1973
  define: { "process.env": {} },

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
