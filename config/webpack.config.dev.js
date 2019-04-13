const webpack = require('webpack');
const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: [
    path.resolve(__dirname, '../src/index.tsx')
  ],
  devtool: 'inline-source-map',
  output: {
    // Virtual path, actually
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json') })
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '../src'),
    port: 7001,
    hot: true,
    hotOnly: false,
    historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: path.resolve(__dirname, '../src/index.ejs'),
      filename: 'index.html',
      minify: { removeComments: true, collapseWhitespace: true },
      inject: true,
      templateContext: {
        isDevelopment: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      tslint: path.resolve(__dirname, '../tslint.json'),
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx|ts|tsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(s*)css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { plugins: () => [require('autoprefixer')], sourceMap: true } },
          { loader: 'resolve-url-loader', options: { sourceMap: true, debug: true } },
          { loader: 'sass-loader', options: { sourceMap: true, includePaths: [path.resolve(__dirname, '../node_modules')] } },
        ]
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
      }
    ]
  }
};
