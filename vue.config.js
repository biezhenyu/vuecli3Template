// 在控制台打印
console.log('***************************')
console.log('环境:' + process.env.NODE_ENV)
console.log('前端域名:' + process.env.VUE_APP_URL)
console.log('接口地址:' + process.env.VUE_APP_APIURL)
console.log('***************************')


module.exports = {

  baseUrl: process.env.VUE_APP_URL || '/',

  outputDir: './dist',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置

  css: {
   // 是否使用css分离插件 ExtractTextPlugin
   extract: true,
   // 开启 CSS source maps?
   sourceMap: false,
   // css预设器配置项
   loaderOptions: {},
   // 启用 CSS modules for all css / pre-processor files.
   modules: false
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // webpack-dev-server 相关配置
  devServer: {
   open: process.platform === 'darwin',
   host: 'localhost',
   port: 8085,
   https: false,
   hotOnly: false,
   proxy: {
    '/': {
      ws: false,
      target: 'https://www.zhipin.com',
      changeOrigin: true,
      pathRewrite: {
        '/': ''
      },
      
    }
   }, // 设置代理
  },
  // 第三方插件配置
  pluginOptions: {
   
  }
}