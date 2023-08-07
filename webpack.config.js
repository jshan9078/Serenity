const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        popup: './popup.html',
        background: './serviceWorker.js',
        style: './popup.css',
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js',
    },
    module:{
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'raw-loader',
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: './popup.html',
        filename: 'popup.html',
    }),
],
}