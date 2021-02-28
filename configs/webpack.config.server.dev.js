const webpack = require('webpack');
const path = require('path');
const rootPath = process.cwd();
const buildPath = path.join(rootPath, './');
const nodeExternals = require('webpack-node-externals');
const commonWebpackConfig = require('./webpack.config.common');


const { NODE_ENV } = process.env;

const cssModuleRegex = /\.module\.scss$/;

const getConfig = (entry, output) => ({
    mode: NODE_ENV || 'development',
    target: 'node',
    stats: {
        outputPath: true
    },
    entry,
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            '@babel/preset-react',
                        ]
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: cssModuleRegex,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            // exportOnlyLocals: true,
                            modules: {
                                localIdentName: "[name]__[local]___[hash:base64:5]",
                            },
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'svg/',
                        emitFile: false
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            emitFile: false
                        }
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            emitFile: false,
                            outputPath: (url) => {
                                return `fonts/${url}`;
                            }
                        }
                    }
                ]
            }
        ],
    },
    output,
    resolve: commonWebpackConfig.resolve,
    plugins: [
        // ignore the error: Error: Can't resolve 'pg-native'
        // solution from here - https://github.com/serverless-heaven/serverless-webpack/issues/78#issuecomment-405646040
        new webpack.IgnorePlugin(/^pg-native$/)
    ],
    externals: [nodeExternals({
        // this WILL include `jquery` and `webpack/hot/dev-server` in the bundle, as well as `lodash/*`
        allowlist: []
    })],
});

module.exports = [
    getConfig('./app.js', {
        filename: 'server.js',
        path: buildPath,
        publicPath: '/assets/'
    }),
    getConfig('./client/app.js', {
        filename: 'assets/client.js',
        path: buildPath,
        publicPath: '/assets/'
    })
];
