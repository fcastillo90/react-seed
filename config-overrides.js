/* eslint-disable import/no-extraneous-dependencies */
const { addWebpackAlias, override } = require('customize-cra')
const path = require('path')
const rewireEslint = require('react-app-rewire-eslint')

module.exports = override(
  rewireEslint,
  addWebpackAlias({
    '@src': path.resolve(__dirname, 'src'),
    '@views': path.resolve(__dirname, 'src/views'),
    '@components': path.resolve(__dirname, 'src/components'),
  }),
)
