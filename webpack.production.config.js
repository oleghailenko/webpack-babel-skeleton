var webpack = require('webpack');
var AppCachePlugin = require('appcache-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
    entry: "./src",

    output: {
        path: __dirname + "/build/",
        filename: "app.[hash].js"
    },

    plugins: [
        new AppCachePlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new HtmlWebpackPlugin({
            filename:  "index.html",
            template: 'src/template.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ],

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ["babel"] },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("css") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract(['css','less']) },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract(['css','sass']) },
            { test: /\.(png|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loaders: ["file-loader"] },
            { test: /\.html$/, loader: 'html-loader?-removeOptionalTags' }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.css']
    },

    postcss: [
        require('autoprefixer'),
        require('postcss-nested')
    ]
};
