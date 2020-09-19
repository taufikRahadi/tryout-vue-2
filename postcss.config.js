const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './public/**/*.html',
    './src/**/*.vue',
    './src/plugins/plugins.js'
  ],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelistPatterns: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/],
})

module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    purgecss
  ],
}