const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
require('dotenv').config();

module.exports = merge(common,{
    mode:'production',
    devtool: 'source-map',
    output:{
        publicPath:process.env.APP_PUBLIC_PATH,
    },
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                },'css-loader','postcss-loader',{
                    loader:'less-loader',
                    options:{
                        javascriptEnabled:true
                    }
                }]
            },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_DEV':JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename:'[name].css',
        }),
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
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
