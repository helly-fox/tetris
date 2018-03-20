import express from 'express';
import path from 'path';
import config from 'node-config-env-value';
import cors from 'cors';

process.on('uncaughtException', (err) => {
    console.error(err.stack);
});

const PORT = config.get('PORT');
const ENV = config.get('NODE_ENV');
const app = express();
let webpack, webpackConfig, compiler;
app.use(cors());

if (ENV === 'localhost') {
    webpack = require('webpack');
    webpackConfig = require('../webpack/webpack.localhost.js');
    compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        hot: true,
        publicPath: '/',
        stats: {
            colors: true,
        },
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`;
    res.set('Content-Encoding', 'gzip');
    next();
});

if (ENV === 'localhost') {
    app.use('*', function (req, res, next) {
        const filename = path.join(compiler.outputPath,'index.html');
        compiler.outputFileSystem.readFile(filename, function(err, result){
            if (err) {
                return next(err);
            }
            res.set('content-type','text/html');
            res.send(result);
            res.end();
        });
    });
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});


app.listen(PORT, (err) => {
    if (err) {
        return console.error(err.stack);
    }
    return console.log(`Server start on: ${PORT}`);
});
