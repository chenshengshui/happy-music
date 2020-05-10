const path = require('path');
const appSrc = path.resolve(__dirname, '../src')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let lessLoader = function (lessPath, isModules) {
    return {
        test: /\.less$/,
        include: lessPath,
        loaders: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: isModules
                            ? '[name]__[local]__[hash:base64:5]'
                            : '[name]'
                    },

                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')({
                            overrideBrowserslist: ['last 5 versions'],
                        }),
                    ],
                },
            },
            {
                loader: 'less-loader'
            },
            {
                loader: 'style-resources-loader',
                options: {
                    patterns: path.resolve(
                        __dirname,
                        '..',
                        'style',
                        'var',
                        '*.less',
                    ),
                    injector: 'append',
                },
            },
        ],
    };
};

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, '..', 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            lessLoader(path.resolve(__dirname, '..', 'src'), true),
            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoader: true,
                            modules: false,
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: /node_modules/,
                include: appSrc,
                loader: "babel-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'index.html',
            inject: "body"
        })
    ],
}
