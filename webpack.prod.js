const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common,{
    mode:'production',
    devtool: 'source-map',
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                },'css-loader','postcss-loader','less-loader']
            },
        ]
    },
    plugins:[
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_DEV':JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[id].css'
        })
    ],
    optimization:{
        minimizer:[
            new UglifyjsWebpackPlugin({
                cache:true,
                sourceMap:true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});
