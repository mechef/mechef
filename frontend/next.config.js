const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const webpack = require('webpack');
module.exports = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // Important: return the modified config
    // if (!dev) {
    config.devtool = 'source-map';

    for (const plugin of config.plugins) {
      if (plugin['constructor']['name'] === 'UglifyJsPlugin') {
        plugin.options.sourceMap = true;
        break;
      }
    }

    // Only load en-us locale
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-us/),
    );

    // }

    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
});
