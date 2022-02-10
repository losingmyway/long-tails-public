/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  apiCachePath: "/api-caches",
  env: {},
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 2000,
      aggregateTimeout: 300,
    };
    return config;
  },
};
