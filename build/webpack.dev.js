const path = require('path');
const config = require('config');
const common = require('./webpack.common');
const merge = require('webpack-merge');

const devServer = {
    open: true,
    inline: true,
    contentBase: path.resolve(__dirname, '..', 'public'),
    port: config.get('devServer.port') || 8080, // 我们把这些配置抽离到 config目录是为了修改方便
    host: config.get('devServer.host') || '0.0.0.0',
    publicPath: '',
    hot: true,
    disableHostCheck: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: false,
    },
}

module.exports = merge(common, {
    mode: 'development',
    devServer: devServer
})
