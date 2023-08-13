const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:8083',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },
    client: {
      overlay: false
    }
  }
})
