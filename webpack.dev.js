const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        hot:true,
        disableHostCheck:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader','postcss-loader']
            }
        ]
    },
    plugins:[
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
