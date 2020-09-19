const postcss = require('@fullhuman/postcss-purgecss')

const purgecss = postcss({
  // Specify the paths to all of the template files in your project.
  content: [
      './public/**/*.html',
      './src/**/*.vue',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelistPatterns: [/-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/, /^router-link(|-exact)-active$/],
});

module.exports = {
  plugins: [
    require("tailwindcss")("./tailwind.config.js"),
    require("autoprefixer"),
    [purgecss]
  ],
}