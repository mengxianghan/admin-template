const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV !== 'development'

/**
 * 获取对应的 CDN 资源
 * @param key
 * @returns {[]}
 */
const getAssetsCDN = (key) => {
    let res = []
    const data = assetsCDN[key]
    if (data.env) {
        res = data.env
    }
    if (data[process.env.NODE_ENV]) {
        res = [
            ...res,
            ...data[process.env.NODE_ENV],
        ]
    }
    return res
}

const assetsCDN = {
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'moment': 'moment',
        'ant-design-vue': 'antd',
        'jschardet': 'jschardet',
        'nprogress': 'NProgress',
    },
    css: {
        env: [
            '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.css',
        ],
    },
    js: {
        env: [
            'https://cdn.jsdelivr.net/npm/tinymce@5.4.0/tinymce.min.js',
            'https://cdn.jsdelivr.net/npm/tinymce-i18n@20.4.4/langs5/zh_CN.js',
        ],
        production: [
            '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
            '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
            '//cdn.jsdelivr.net/npm/vue-router@3.3.4/dist/vue-router.min.js',
            '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
            '//cdn.jsdelivr.net/npm/moment@2.26.0/min/moment.min.js',
            '//cdn.jsdelivr.net/npm/moment@2.29.1/locale/zh-cn.js',
            '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.2/dist/antd.min.js',
            '//cdn.jsdelivr.net/npm/jschardet@2.1.1/dist/jschardet.min.js',
            '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
        ],
    },
}

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: process.env.VUE_APP_OUTPUT_DIR,
    assetsDir: 'static',
    runtimeCompiler: true,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        //proxy: {
        //    '/api': {
        //        target: '',
        //        changeOrigin: true, // 允许 webSockets 跨域
        //        secure: false,
        //        pathRewrite: {
        //            '^/api': ''
        //        }
        //    }
        //},
        watchOptions: {
            ignored: /node_modules|dist|.git|.idea/,
            poll: true,
        },
    },
    configureWebpack: {
        externals: isProd ? assetsCDN.externals : {},
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/,
                filename: '[path].gz[query]',
                threshold: 10240,
                deleteOriginalAssets: false,
            }),
        ],
    },
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_TITLE
                args[0].cdn = {}
                args[0].cdn.css = getAssetsCDN('css')
                args[0].cdn.js = getAssetsCDN('js')
                return args
            })
    },
    productionSourceMap: !isProd, // 生产环境是否生成 sourceMap 文件
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'hack': `true; @import '~@/assets/style/theme.less'`,
                },
                javascriptEnabled: true,
            },
            sass: {
                prependData: `@import '~@/assets/style/vars.scss';`,
            },
        },
    },
}

