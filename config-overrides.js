/* eslint-disable */
const { name } = require('./package')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  webpack: (config) => {
    config.output.library = name
    config.output.libraryTarget = 'umd'
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`
    // CSS replace MiniCssExtractPlugin
    config.plugins = config.plugins.map((plugin) => {
      return plugin instanceof MiniCssExtractPlugin
        ? new MiniCssExtractPlugin({
            ignoreOrder: true,
          })
        : plugin
    })
    return config
  },
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost)
      config.historyApiFallback = true
      config.open = false
      config.hot = false
      config.liveReload = true
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      }
      return config
    }
  },
  jest: (config) => {
    config.collectCoverageFrom = [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/*.d.{js,jsx,ts,tsx}',
      '!src/**/index.*',
      '!src/serviceWorker.ts',
      '!src/public-path.js',
      '!src/reportWebVitals.ts',
      '!src/microapp/config.ts',
      // Temporarily leave these 2 files in the directory in case we need to manually test the behavior with
      // some specific API returns.
      '!src/pages/VersionPage/mockAPIs.ts',
      '!src/pages/VersionPage/mockedData.ts',
    ]
    config.transform = {
      '\\.[tj]sx?$': ['@swc/jest'],
      ...config.transform,
    }
    return config
  },
}
