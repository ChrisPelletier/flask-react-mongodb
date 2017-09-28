var webpack = require("webpack");

module.exports = {
    entry: __dirname + '/static/js/App.js',
    output: {
        path: __dirname + '/static/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets:['react'],
                    plugins:['transform-object-rest-spread']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin({})
    ]
};