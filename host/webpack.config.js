const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const packageJson = require('./package.json');

const PORT = 1000;

module.exports = {
  mode: 'production',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, './dist/host'),
    publicPath: `http://localhost:${PORT}/`,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  // extensions
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      // babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },

  devServer: {
    port: PORT,
    historyApiFallback: true,
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
    },
    hot: false,
    client: {
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ModuleFederationPlugin({
      name: 'host_react',
      shared: packageJson.dependencies,
    })
  ],
};
