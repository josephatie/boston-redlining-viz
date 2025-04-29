// postcss.config.cjs
module.exports = {
  plugins: {
    // Tell the plugin exactly where your Tailwind config lives
    '@tailwindcss/postcss': { config: './tailwind.config.js' },
    autoprefixer: {},
  },
};
