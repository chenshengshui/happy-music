const path = require('path');
const config = require('config');
const appSrc = path.resolve(__dirname, '../src');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const isDevelopment = NODE_ENV === 'development';

const lessLoader = function (lessPath, isModules) {
    return {
        test: /\.less$/,
        include: lessPath,
        loaders: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: isDevelopment
                }
            }
            ,
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
    entry: './src/index.tsx',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, '..', 'public'),
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDevelopment
                        }
                    },
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
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: "/"
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|eot|otf|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                loaders: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            publicPath: '/'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loaders: [
                    {
                        loader: 'json-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'index.html',
            title: config.get('appName'),
            inject: "body"
        })
    ]
}
