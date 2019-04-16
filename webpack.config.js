const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const GoogleFontsPlugin = require('@beyonk/google-fonts-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin([
      { from: './static/index.html' },
    ]),
    new CopyPlugin([
      { from: './static/images/favicon.ico' },
    ]),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Lato' },
      ],
    }),
  ],
  node: {
    global: true,
  },
}
