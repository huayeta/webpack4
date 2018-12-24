const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const entries = {}
const entriesName = []
const exportHtmlConfig = []
glob.sync('./src/pages/*/index.js').forEach(path => {
    const entryName = path.split('./src/pages/')[1].split('/index.js')[0]
    entries[entryName] = path
    entriesName.push(entryName)
    exportHtmlConfig.push(
        new HtmlWebpackPlugin({
            filename: `${entryName}.html`,
            template: `${path.split('/index.js')[0]}/index.html`,
            inject: 'body',
            hash: false,
            chunks: ['manifest', entryName]
        })
    )
})

module.exports = {
    entry:entries,
    output:{
        filename:'[name].[hash].js',
        chunkFilename:'[name].[hash].js',
        path:path.resolve(__dirname,'./dist')
    },
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false
                    }
                }
            },
            {
                test:/\.(gif|png|jpg|svg)$/,
                use:['file-loader']
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:['file-loader']
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        ...exportHtmlConfig
    ],
    optimization:{
        splitChunks:{
            chunks:'all',
            name:'manifest',
            minChunks:Infinity
        }
    }
};
