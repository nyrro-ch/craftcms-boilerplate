// node modules
const path = require('path');

// package.json settings
const pkg = require('./package.json');

const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TailwindCss = require('tailwindcss');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');


// return a webpack config
module.exports = {
  entry: {
    'app': '../src/js/app.js',
  },
  experiments: {
      topLevelAwait: true,
  },
  name: pkg.name,
  resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      modules: [ path.resolve(__dirname, './node_modules') ],
  },
  stats: {
      colors: true,
  },
  devtool: false,
  mode: 'production',
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  output: {
    filename: path.join('./js', '[name].[contenthash].js'),
    path: path.resolve(__dirname, '../cms/web/dist'),
    publicPath: 'https://baseurl/dist/',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('./css', '[name].[contenthash].css'),
    }),
    new webpack.EvalSourceMapDevToolPlugin({
      test: /\.(m?js|ts)($|\?)/i,
      exclude: /\.(pcss|css)($|\?)/i,
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      basePath: '',
      map: (file) => {
        file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
        return file;
      },
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
      verbose: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: "../src/fonts/", to: "fonts/" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env', {
                  modules: false,
                  corejs: {
                    version: 3,
                    proposals: true
                  },
                  debug: false,
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: pkg.browserslist.modernBrowsers,
                  },
                }
              ],
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              '@babel/plugin-proposal-optional-chaining',
            ],
            sourceType: 'unambiguous',
          },
        },
      },
      {
        test: /\.(pcss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
              import: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                path: path.resolve(__dirname),
                plugins: [
                  ['postcss-import', {
                    path: ['./node_modules'],
                  }],
                  TailwindCss('./tailwind.config.js'),
                  ['postcss-mixins', {
                  }],
                  ['postcss-nested', {
                  }],
                  ['postcss-hexrgba', {
                  }],
                  ['autoprefixer', {
                  }],
                ],
              }
            }
          }
        ]
      },
    ],
  },
  watchOptions: {
      poll: false | 0,
  },
}
