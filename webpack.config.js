const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node',
  devServer: {
    /* contentBase: path.join(__dirname, './public'), */
    /* port: 8000, */
    hot: true,
    open: true
    /* historyApiFallback: true, */
  },
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'server'),
    clean: true
  },
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, 'models'),
      '@views': path.resolve(__dirname, 'views'),
      '@controllers': path.resolve(__dirname, 'controllers'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@routes': path.resolve(__dirname, 'routes'),
      '@database': path.resolve(__dirname, 'database')
    },
    extensions: ['.js', '.ts'],
    modules: ['node_modules', path.join(__dirname, '.')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()]
};
