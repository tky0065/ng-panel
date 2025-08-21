/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/ng-panel/src/**/*.{html,ts}",  // Files dans la bibliothèque
    "./projects/test-app/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")
  ],
  daisyui: {
    themes: true,
  }
}