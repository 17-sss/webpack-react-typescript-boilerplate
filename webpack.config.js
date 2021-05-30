const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // or production
  entry: './src/index.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 템플릿 경로
      hash: true, //핑거 프린트
    }),
  ],

  devtool: 'source-map', // hidden-source-map (production 모드에선 이거쓰기)
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.(webp|jpg|png|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]', // 파일명 형식
        },
      },
    ],
  },

  devServer: {
    contentBase: path.resolve('./public'),
    // publicPath: path.resolve("./public"),
    filename: '[name].js',
    hot: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    // writeToDisk: true
  },
};
