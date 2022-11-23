const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {

  publicPath: '/',
  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
    extract: process.env.NODE_ENV === 'production'
  },

  lintOnSave: process.env.NODE_ENV !== 'production',

  devServer: {
    host: '0.0.0.0',
    hot: true,
    port: 3000,
    open: true,
    // proxy: process.env.NODE_ENV !== 'production' ? 'http://192.168.14.83:9088' : 'http://192.168.2.30:9098',
    proxy: {
      '/api/*': {
        target: process.env.NODE_ENV !== 'production' ? 'http://192.168.2.30:8097' : 'http://192.168.2.30:9077',
        changeOrigin: true,
        secure: false,
        pathRewrite:{
          '^/api':'/api'
        }
      }
    }
  },

  configureWebpack: config => {
    let _config = {}
    _config.resolve = {
      alias: {
        utils: resolve('src/utils'),
        api: resolve('src/assets/api/index.js')
      }
    }
    if (process.env.NODE_ENV === 'production') {
      _config.plugins = []
    }
    return _config
  },

  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  productionSourceMap: false,
  integrity: false,
  filenameHashing: true,
}
