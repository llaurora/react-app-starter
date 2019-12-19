const flexbugsFixes = require('postcss-flexbugs-fixes');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  sourceMap: true,
  plugins: [
    flexbugsFixes,
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
  ],
};
