const dotenv = require("dotenv");
const webpack = require('webpack');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

// Other
const appPaths = require('./appPaths');

const { parsed: config } = dotenv.config({
  path: path.resolve(__dirname, `../src/env/${process.env.NODE_ENV === 'production' ? 'prod.env' : 'dev.env'}`)
});

module.exports = {
  mode: 'production',
  target: 'web',
  entry: [path.join(appPaths.webBase, 'index.tsx')],
  devtool: 'source-map',
  output: {
    path: appPaths.webOutput,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [appPaths.node_modules],
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      'roboto-fonts': ''
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: appPaths.tsConfig })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_PORT': JSON.stringify(config.APP_PORT),
    }),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: path.join(appPaths.webBase, 'index.ejs'),
      favicon: path.join(appPaths.webBase, 'favicon.ico'),
      filename: 'index.html',
      minify: { removeComments: true, collapseWhitespace: true },
      inject: true,
      templateContext: {
        isDevelopment: false
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: appPaths.tsConfig,
      tslint: appPaths.tsLint,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options      
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx|ts|tsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { hmr: true, reloadAll: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')], sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true, debug: true } },
          { loader: 'sass-loader', options: { sourceMap: true, includePaths: [appPaths.node_modules] } },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/[name].[ext]'
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } }]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'file-loader', options: { name: '[name].[ext]', outputPath: 'fonts/' } }]
      }
    ]
  }
};