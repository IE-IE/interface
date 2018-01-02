// https://github.com/michael-ciniawsky/postcss-load-config
const createResolver = require('postcss-import-webpack-resolver');
const webpackConfig = require('./build/webpack.base.conf');

module.exports = {
  'plugins': {
    // to edit target browsers: use "browserslist" field in package.json
    'postcss-import': {
      resolve: createResolver({
        // use aliases defined in config 
        alias: webpackConfig.resolve.alias,
   
        // include where to look for modules 
        modules: ['src', 'node_modules']
      })
    },
    'postcss-each': {},
    'postcss-for': {},
    'postcss-selector-not': {},
    'postcss-focus': {},
    'autoprefixer': {},
    'cssnano': {}
  }
}
