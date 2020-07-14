// vue.config.js
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': 'purple',
          'link-color': 'purple',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    host: '127.0.0.1',
    port: 6666,
  }
};