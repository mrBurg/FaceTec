const path = require('path');

module.exports = {
  distDir: 'build',
  env: {},
  // inlineImageLimit: 16384,
  // fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  /* images: {
    deviceSizes: [320, 480, 640, 768, 960, 1200, 1440],
  }, */
  i18n: {
    locales: ['ua-UA'],
    defaultLocale: 'ua-UA',
    domains: [
      {
        domain: 'http://localhost',
        defaultLocale: 'ua-UA',
      },
    ],
    localeDetection: false,
  },
  webpack(baseConfig, _options) {
    const { module = {} } = baseConfig;

    const config = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: false,
            },
          },
        ],
      },
    ];

    config.resolve.alias = {
      ...config.resolve.alias,
      normalize: 'normalize.css/normalize.css',
    };

    config.plugins = [...config.plugins];

    // console.log(config, options);
    return config;
  },
};
