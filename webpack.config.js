const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "/dist"),
        filename: "js/bundle.js"
    },
    devServer: {
        port: 3000  
    }, 

    module: {
        rules: [
            {
                test: /\.css$/,
                //test: /\.scss$/,
                use: [
                    //{ loader: 'style-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.hbs/,
                loader: "handlebars-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "./src/views/layouts/main.hbs",
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
          }),
        new MiniCssExtractPlugin ({
            filename: 'css/bundle.css'
        })
    ]
}