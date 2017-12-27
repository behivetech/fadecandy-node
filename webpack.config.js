// For info about this file refer to webpack and webpack-hot-middleware documentation
// Rather than having hard coded webpack.config.js for each environment, this
// file generates a webpack config for the environment passed to the getConfig method.

// Vendor Libs
const webpack = require('webpack');
const path = require('path');

// Webpack Plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = function getConfig(env) {
    const isDev = () => (true || env === 'development');
    const bundleFileNames = {
        app: {
            js: (isDev()) ? 'bundles/bundle.js' : 'bundles/bundle.[hash].js',
            css: (isDev()) ? 'bundles/styles.css' : 'bundles/styles.[hash].css',
        }
    };
    const globals = {
        'process.env.NODE_ENV': JSON.stringify((isDev()) ? 'development' : 'production'),
        __DEV__: isDev(),
    };

    const getPlugins = () => {
        const plugins = [
            new webpack.DefinePlugin(globals),
            new CaseSensitivePathsPlugin(),
            new ExtractTextPlugin({
                filename: bundleFileNames.app.css,
                disable: false,
                allChunks: true
            })
        ];

        if (isDev()) {
            plugins.push(new webpack.HotModuleReplacementPlugin());
        } else {
            plugins.push(
                new webpack.LoaderOptionsPlugin({
                    debug: false,
                    minimize: true
                }),
                new webpack.optimize.UglifyJsPlugin({
                    beautify: false,
                    comments: false,
                    compress: {
                        comparisons: true,
                        conditionals: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true,
                        passes: 3,
                        screw_ie8: true,
                        sequences: true,
                        unused: true
                    },
                    mangle: {
                        screw_ie8: true
                    },
                    parallel: true,
                    sourceMap: true
                }),
                new AssetsPlugin({
                    path: path.join(__dirname, 'dist'),
                    fullPath: false
                })
            );
        }

        return plugins;
    };

    const rules = [{
        test: /\.js$/,
        include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'config')
        ],
        use: (isDev()) ? ['react-hot-loader/webpack', 'babel-loader'] : 'babel-loader'
    }, {
        test: /(\.css|\.scss|\.sass)$/,
        include: [
            path.join(__dirname, 'app/assets/stylesheets'),
            path.join(__dirname, 'src'),
        ],
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }]
        })
    }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'application/font-woff'
            }
        }]
    }, {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: 'assets/[hash].[ext]'
            }
        }]
    }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
    }];

    const getEntry = () => {
        const app = [];

        if (isDev()) {
            app.push('webpack-hot-middleware/client');
        }
        app.push('./src/index');

        return {app};
    };

    return {
        devtool: (isDev()) ? 'eval-source-map' : 'source-map',
        entry: getEntry(),
        target: 'web',
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: bundleFileNames.app.js,
        },
        plugins: getPlugins(),
        module: {rules},
        resolve: {
            modules: [
                path.join(__dirname, 'src'),
                'node_modules'
            ]
        }
    };
};
