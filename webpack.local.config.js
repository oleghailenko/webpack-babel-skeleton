var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {

    // Efficiently evaluate modules with source maps
    devtool: [
        "eval",
        "source-map"
    ],

    // Set entry point to ./src/main and include necessary files for hot load
    entry:  [
        "webpack-dev-server/client?http://localhost:9090",
        "webpack/hot/only-dev-server",
        "./src"
    ],

    // This will not actually create a bundle.js file in ./build. It is used
    // by the dev server for dynamic hot loading.
    output: {
        path: __dirname + "/build/",
        filename: "app.js",
        publicPath: "http://localhost:9090/build/"
    },

    // Necessary plugins for hot load
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true })
    ],

    // Transform source code using Babel and React Hot Loader
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [
                    path.resolve(__dirname, "src")
                ]
            }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"], plugins: ['transform-runtime'] },
            { test: /\.css$/, loader: "style!css?sourceMap" },
            { test: /\.less$/, loader: 'style!css?sourceMap!less?sourceMap' },
            { test: /\.scss$/, loader: 'style!css?sourceMap!sass?sourceMap' },
            { test: /\.(png|svg)$/, loader: 'url-loader?limit=100000' },
            { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loaders: ["file-loader"] }
        ]
    },

    // Automatically transform files with these extensions
    resolve: {
        extensions: ['', '.js', '.css'],
        modulesDirectories: ['node_modules']
    },

    // Additional plugins for CSS post processing using postcss-loader
    postcss: [
        require('autoprefixer'), // Automatically include vendor prefixes
        require('postcss-nested') // Enable nested rules, like in Sass
    ]

};
