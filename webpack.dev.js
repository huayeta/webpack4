const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const DashboardPlugin = require('webpack-dashboard/plugin');

require('dotenv').config();
const THEME=process.env.THEME;

module.exports = merge(common,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:[path.join(__dirname,`./${THEME}-dist`)],
        compress:true,
        historyApiFallback:true,
        hot:true,
        disableHostCheck:true,
        watchContentBase:true,
        proxy:{
            // '/pay/create-order':'http://linkcn.inc:8080'
        }
    },
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use:['style-loader','css-loader','postcss-loader',{
                    loader:'less-loader',
                    options:{
                        javascriptEnabled:true
                    }
                }]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_DEV':JSON.stringify('development')
        }),
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
