const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

require('dotenv').config();
const THEME=process.env.THEME;

const entries = {};
const exportHtmlConfig = [];
glob.sync(`./src/${THEME}/*/index.js`).forEach(path => {
    const entryName = path.split(`./src/${THEME}/`)[1].split('/index.js')[0]
    entries[entryName] = path;
    exportHtmlConfig.push(
        new HtmlWebpackPlugin({
            filename: `${entryName}.html`,
            template: `${path.split('/index.js')[0]}/index.html`,
            inject: 'body',
            hash: false,
            chunks: ['vendor', entryName]
        })
    )
})

module.exports = {
    entry:entries,
    output:{
        filename:'[name].js',
        chunkFilename:'[name].js',
        path:path.resolve(__dirname,`./${THEME}-dist`),
    },
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude:/(node_modules|bower_components)/,
                use:[{
                    loader:'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false
                    }
                }]
            },
            {
                test:/\.(gif|png|jpg|svg)$/,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:8192,
                        name:'images/[folder]/[name].[hash:5].[ext]',
                    }
                }, {
                    loader: 'image-webpack-loader',
                }]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:['file-loader']
            },{
                test:/\.html$/,
                use:['html-loader']
            }
        ]
    },
    resolve:{
        alias:{
            Base:path.resolve(__dirname,'./src/base')
        }
    },
    plugins:[
        new CleanWebpackPlugin([`${THEME}-dist`]),
        ...exportHtmlConfig,
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProgressPlugin(),
    ],
    optimization:{
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks:{
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                }
            }
        }
    }
};
