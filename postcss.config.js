module.exports = (ctx) => ({
  plugins: [
    require('@tailwindcss/postcss')({
      config: './tailwind.config.custom.js'
    }),
    require('autoprefixer'),
  ]
})
