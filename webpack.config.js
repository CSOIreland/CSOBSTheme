const miniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/js/app.bootstrap.guideline.js',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: {
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`;
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: false },
            },
          ],
        },
      }),
    ],
    minimize: true,
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: "app.bootstrap.guidelines.min.css",
    })],
  output: {
    filename: 'app.bootstrap.guidelines.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader', options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: "sass-loader", options: { sourceMap: true }
          },
        ]
      }
    ]
  }
}