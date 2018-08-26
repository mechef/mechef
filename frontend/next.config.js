module.exports = {
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
    // }

    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
};
