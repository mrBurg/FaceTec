const path = require('path');

const currentLocale = process.env.LOCALE || 'en-US';
const assetPrefix = '/liveness-static';

module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  assetPrefix,
  async rewrites() {
    return [
      {
        source: `/${currentLocale}${assetPrefix}/_next/static/:path*`,
        destination: '/_next/static/:path*',
        locale: false,
      },
    ];
  },
  env: {
    DOMAIN: process.env.DOMAIN || '',
    ENVIRONMENT: process.env.ENVIRONMENT || '',
    // для локальной разработки
    DEVELOPMENT_HTTP_SERVER: process.env.DEVELOPMENT_HTTP_SERVER || '',
    HTTPS_SERVER: process.env.HTTPS_SERVER || '',
  },
  // inlineImageLimit: 16384,
  // fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  /* images: {
    deviceSizes: [320, 480, 640, 768, 960, 1200, 1440],
  }, */
  i18n: {
    locales: [currentLocale],
    defaultLocale: currentLocale,
    domains: [
      {
        domain: process.env.DOMAIN,
        defaultLocale: currentLocale,
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
