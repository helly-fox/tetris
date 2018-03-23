const path = require('path');
const appRoot = require('app-root-path');
const webpack = require('webpack');
const config = require('node-config-env-value');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const NODE_ENV = config.get('NODE_ENV');

module.exports = {

    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        path.join(appRoot.path, 'src/main.js'),
    ],

    output: {
        path: path.join(appRoot.path, 'build/src/public'),
        filename: 'bundle.[hash].js',
        publicPath: '/',
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin({ NODE_ENV }),
        new HtmlWebpackPlugin({
            title: 'Tetris',
        }),
        new ReactRootPlugin(),

        new FaviconsWebpackPlugin({
            logo: './src/static/logo.jpeg',
            prefix: 'icons-[hash]/',
            emitStats: false,
            statsFilename: 'iconstats-[hash].json',
            persistentCache: true,
            inject: true,
            background: '#fff',
            title: 'Tetris',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false,
            },
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /public/],

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader',
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader',
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        alias: {
            src: path.join(appRoot.path, '/src'),
        },
    },

};
