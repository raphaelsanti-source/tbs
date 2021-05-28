var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
    },
    devtool: "source-map",
    mode: 'development', // none, development, production
    devServer: {
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './index.html', //relative to root of the application
            title: "Twój tytuł",
            template: './src/index.html',
            chunks: ['index']
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=portal/content/json'
                ]
            },
            {
                test: /.(fbx)$/i,
                type: 'asset/resource',
            },
            {
                test: /.(tga)$/i,
                type: 'asset/resource',
            }
        ]
    },


};