/* global global app process console __dirname */
/* eslint no-console: ["error", { allow: ["log", "error"] }] */

// Vendor Libs
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const port = 8080;
const serverIsSrc = !(process.argv[2] === 'dist'); // should we run from /dist or from /src using webapck?
let env;

if (serverIsSrc) {
  env = process.env.NODE_ENV = 'development';
} else {
  env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';
}
console.log(`Running App ${env} from ${serverIsSrc ? 'source' : 'dist'}`);

global.app = express();

app.locals = {
  pretty: true
};

if (serverIsSrc) {
  const webpack = require('webpack');
  const webpackConfigBuilder = require('../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = webpackConfigBuilder(env);
  const bundler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(bundler, {
    publicPath: webpackConfig.output.publicPath, // Dev middleware can't access config, so we provide publicPath
    path: '//localhost:8081/__webpack_hmr',
    stats: { colors: true }, // pretty colored output
    noInfo: true, // Set to false to display a list of each file that is being bundled.
    hot: true,
    quiet: false,
    lazy: false
  }));
  app.use(webpackHotMiddleware(bundler));
}

const publicPath = path.join(__dirname, (serverIsSrc ? '../src' : '../dist'));

app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../public' )));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', require('./routes')); // must be after dev middlewares and express.static

app.listen(port, function(err) {
  if (err) console.log(err);
});
