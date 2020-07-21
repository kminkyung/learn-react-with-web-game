const path = require('path');

module.exports = {
  name: 'tic-tac-toe',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.jsx', '.js']
  },
  entry: {
    app: ['./client']
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties']
      }
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  }
}