const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { separator } = require('./utils/constant')
const { getEntryTemplate } = require('./utils/helper')

const packages = process.env.packages.split(separator)
const { entry, htmlPlugins } = getEntryTemplate(packages)

module.exports = {
  entry,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@packages': path.resolve(__dirname, '../src/packages'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    },
    mainFiles: ['index', 'main'],
    extensions: ['.ts', '.tsx', '.less', 'json', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.less/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type:'asset/inline'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    ...htmlPlugins
  ]
};