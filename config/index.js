'use strict'
// Template version: 1.3.1
// * see http://vuejs-templates.github.io/webpack for documentation.
// const options = require('../src/config.json')
const path = require('path')
const env = process.env.NODE_ENV
console.log({ env })
const project = require('../src/content/project.json').name
const distOutput = require('../build_extra/distOutput')()
const md5 = require('md5')

const paths = {
  UAT: require('../src/content/config/uat.json').path,
  UAT_LOCAL: require('../src/content/config/uat_local.json').path,
  PROD: require('../src/content/config/prod.json').path,
}

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    // assetsPublicPath: env === 'UAT' ? './' : '/',
    assetsPublicPath: env ? paths[env.toUpperCase()] + '/' : '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, `../dist/${distOutput}/preview.html`),
    // Replace preview.html file for html file with hased project name to redice discoverability
    index: path.resolve(__dirname, `../dist/${distOutput}/index.html`),

    // Paths
    // assetsRoot: path.resolve(__dirname, `../dist/${env}`),
    // assetsSubDirectory: 'static',
    // // assetsPublicPath: paths[env] + '/',
    // assetsPublicPath: './',
    assetsRoot: path.resolve(__dirname, `../dist/${distOutput}`),
    assetsSubDirectory: 'static',
    // assetsPublicPath: `${paths[env]}/${process.cwd().toLowerCase().split('t3interactives/')[1] || project}/dist/${env}/`,
    assetsSubDirectory: env ? paths[env.toUpperCase()] + '/' : '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
