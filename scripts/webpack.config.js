const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostcssImport = require('postcss-import');
const precss = require('precss');
const cssnext = require('postcss-cssnext');

const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';
const HOST = process.env.HOST || `0.0.0.0`;
const PORT = process.env.PORT || 9999;

const SRC = path.join(process.cwd(), 'src');
const BUILD = path.join(process.cwd(), 'build');
const TEMPLATE = path.join(process.cwd(), 'template');
const ENTRIES = path.join(SRC, 'entries');
const BASEDIR = path.join(__dirname, '..');

const NODE_ENV = process.env.NODE_ENV || 'production';

const config = {
    // entry: {
    //     common: [
    //         // 'babel-polyfill',
    //         'react',
    //         'react-dom'
    //     ]
    // },
    entry: {},
    output: {
        path: `${BUILD}`,
        filename: '[name]',
        publicPath: './'
    },
    devtool: 'eval',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=2048000'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.pcss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    PostcssImport(),
                                    precss,
                                    cssnext,
                                ];
                            },
                        },
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                include: [
                    path.resolve(BASEDIR, 'src'),
                ],
                use: 'eslint-loader',
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin(`${ENTRIES}/[name]-[hash].pcss`),
        // new webpack.optimize.CommonsChunkPlugin('common', 'js/common.js'),
        // new webpack.NamedModulesPlugin(),
    ],
};

let entriesList = [];
let entriesPathTemp = '';
const dictories = fs.readdirSync(SRC).filter((item) => true);
console.log(dictories);

dictories.forEach((dic) => {
    console.log(dic);
    const pathTemp = path.join(SRC, dic);
    console.log(pathTemp);

    const entriesTemp = fs.readdirSync(pathTemp).filter((item) => {
        console.log(item);
        return item === 'entries';
    });
    console.log(entriesTemp);
    if (entriesTemp.length) {
        entriesPathTemp = path.join(pathTemp, entriesTemp[0]);
        console.log(entriesPathTemp);
        const files = fs.readdirSync(entriesPathTemp).filter((item) => {
            return item.split('.')[1] === 'js';
        });

        const entries = files.map((item) => {
            return {
                fileName: item,
                filePath: entriesPathTemp,
            }
        });
        console.log(entries);

        entriesList = entriesList.concat(entries);
    }
});

// const entriesList = fs.readdirSync(ENTRIES).filter((item) => {
//     console.log(item);
//     return item.split('.')[1] === 'js';
// });
console.log('entriesList: ', entriesList);

entriesList.forEach((item) => {
    const {
        entry,
        plugins
    } = config;

console.log('item: ', item);
    entry[item.fileName] = [`${item.filePath}/${item.fileName}`];
console.log('entry[item]: ', entry[item.fileName]);

    const htmlName = item.fileName.split('.')[0].toLowerCase();
    plugins.push(
        new HtmlWebpackPlugin({
            template: `${TEMPLATE}/index.html`,
            filename: `${htmlName}.html`,
            hash: false,
            inject: 'body',
            chunks: [
                // 'common',
                item.fileName,
            ]
        })
    );
});

switch (NODE_ENV) {
    case ENV_DEVELOPMENT:
        console.log('dev start');
        config.output.publicPath = '/';
        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: false,
                assets: false,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: true,
                warnings: true,
                publicPath: false
            },
            host: HOST,
            port: PORT
        };

        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
        break;
    // case ENV_PRODUCTION:
    //     config.plugins.push(
    //         new webpack.optimize.UglifyJsPlugin({
    //             compress: {
    //                 warnings: false
    //             }
    //         }),
    //         new webpack.DefinePlugin({
    //             'process.env': {
    //                 NODE_ENV: JSON.stringify('production')
    //             }
    //         })
    //     );
    //     break;
    default:
        break;
}

module.exports = config;
