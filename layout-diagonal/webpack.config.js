const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const banner = () =>{
    let date = new Date();
    return [
        `@project: 180607_warrior`,
        `@author: NCSOFT`,
        '@update: ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    ].join('\n');
};

module.exports = {
    entry: {
        'index': `${__dirname}/src/js/index.js`
    },
    
    output: {
        filename: '[name].js',
        path: `${__dirname}/dist/js`
    },
    
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader',
                options: {
                    'presets': [
                        [
                            'env',
                            {
                                'modules': false,
                                'targets': {
                                    'browsers': [
                                        'last 2 versions',
                                        'ie >= 10'
                                    ]
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    
    plugins: [
        new webpack.BannerPlugin({
            banner: banner()
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    
    devtool: 'source-map'
};