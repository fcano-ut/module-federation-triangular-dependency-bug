const path = require('path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');
const packageJson = require('./package.json');

const PORT = 1002;

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
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
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
    new ModuleFederationPlugin({
      name: 'mfe_2',
      exposes: {
        '.': './src/index.microfrontend.js',
      },
      shared: packageJson.dependencies,
    })
  ],
};
