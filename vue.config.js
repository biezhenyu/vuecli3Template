const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 在控制台打印
console.log('***************************')
console.log('环境:' + process.env.NODE_ENV)
console.log('前端域名:' + process.env.VUE_APP_URL)
console.log('接口地址:' + process.env.VUE_APP_APIURL)
console.log('***************************')


// cdn 预加载使用
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT',
  'moment': 'Moment'
}

const cdn = {
  // 开发环境
  dev: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/moment.js/2.23.0/locale/af.js'
    ],
    js: []
  },
  // 生产环境
  build: {
    css: [
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.5.21/vue.min.js',
      'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/moment.js/2.23.0/locale/af.js'
    ]
  }
}

// 是否使用gzip
const productionGzip = false
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {

  baseUrl: process.env.VUE_APP_URL || '/',

  outputDir: './dist',

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // webpack配置
  chainWebpack: (config) => {

    // 添加CDN参数到 htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.build
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })

  },

  // 修改webpack config, 使其不打包externals下的资源
  configureWebpack: (config) => {

    const myConfig = {}

    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals

      myConfig.plugins = []

      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
    }

    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig

  },

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