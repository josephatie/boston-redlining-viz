// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.cjs',   // <— use the .cjs file, not .js
    },
    autoprefixer: {},
  },
}
