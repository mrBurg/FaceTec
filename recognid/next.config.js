const path = require('path');
// const _ = require('lodash');

// const { Sitemap } = require('./plugins');
// const cfg = require('./config.json');

// const redirectPages = ['/index', '/contacts'];

module.exports = {
  distDir: 'build',
  env: {
    // ENVIRONMENT: process.env.ENVIRONMENT,
  },
  /* async redirects() {
    return _.reduce(
      redirectPages,
      (accum, item) => {
        accum.push({
          source: `${item}(.x?html):slug*`,
          destination: `${item}:slug*`,
          permanent: true,
          basePath: false,
        });

        return accum;
      },
      []
    );
  }, */
  /* async headers() {
    return [
      {
        source: '/(.*)',
        headers: [],
      },
    ];
  }, */
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: 'http://localhost',
        defaultLocale: 'en-US',
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

    config.plugins = [
      ...config.plugins,
      /* new Sitemap({
        baseUrl: !PO_PROJECT_PORT
          ? PO_PROJECT_HOST
          : `${PO_PROJECT_HOST}:${PO_PROJECT_PORT}`,
        pagesDirectory: path.resolve(__dirname, 'pages'),
        targetDirectory: './',
      }), */
    ];

    // console.log(config, options);
    return config;
  },
};
