var express = require('express');
var app = express();

app.get('/app.js', function(req, res) {
    if (process.env.PRODUCTION) {
        res.sendFile(__dirname + '/src/app.js');
    } else {
        res.redirect('//localhost:9090/build/app.js');
    }
});

app.get('/style.css', function(req, res) {
    if (process.env.PRODUCTION) {
        res.sendFile(__dirname + '/src/style.css');
    } else {
        res.redirect('//localhost:9090/build/style.css');
    }
});

app.use(express.static(__dirname + '/src'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

if (!process.env.PRODUCTION) {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var config = require('./webpack.local.config');

    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        noInfo: true,
        historyApiFallback: true
    }).listen(9090, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("All is OK");
        }
    });
}

var port = process.env.PORT || 8081;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Sample app listening at http://%s:%s', host, port);
});
