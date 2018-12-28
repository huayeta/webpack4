const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        hot:true,
        disableHostCheck:true,
        proxy:{
            '/api':'http://localhost:3000'
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
