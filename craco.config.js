// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Fallback for Node's built-in fs (used by jsPDF)
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
      };

      // Prepend a rule to process any CSS file in semantic-ui-css as plain CSS
      webpackConfig.module.rules.unshift({
        test: /semantic-ui-css\/.*\.css$/,
        enforce: 'pre',
        use: [
          { loader: require.resolve('style-loader') },
          { loader: require.resolve('css-loader') }
        ],
      });

      // Exclude semantic-ui-css from scss/sass processing in existing rules
      webpackConfig.module.rules.forEach(rule => {
        if (rule.oneOf) {
          rule.oneOf.forEach(one => {
            if (
              one.test &&
              one.test.toString().includes('scss') &&
              one.use &&
              one.use.some(loader => loader.loader && loader.loader.includes('sass-loader'))
            ) {
              if (one.exclude) {
                if (!Array.isArray(one.exclude)) {
                  one.exclude = [one.exclude];
                }
                one.exclude.push(/semantic-ui-css/);
              } else {
                one.exclude = [/semantic-ui-css/];
              }
            }
          });
        }
      });

      return webpackConfig;
    },
  },
};
