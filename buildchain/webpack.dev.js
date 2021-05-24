// node modules
const path = require('path');

// package.json settings
const pkg = require('./package.json');

const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TailwindCss = require('tailwindcss');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  devServer: {
    client: {
        progress: false,
    },
    firewall: false,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    host: '0.0.0.0',
    hot: true,
    https: false,
    port: 3000,
    public: 'http://0.0.0.0:3000',
    static: {
      directory: path.resolve(__dirname, '../cms/templates/'),
      publicPath: '/',
      watch: {
        poll: false | 0,
        ignored: /node_modules/,
      },
    },
  },
  devtool: false,
  mode: 'development',
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  watchOptions: {
    poll: false | 0,
  },
  output: {
    filename: path.join('./js', '[name].[contenthash].js'),
    path: path.resolve(__dirname, '../cms/web/dist/'),
    publicPath: 'http://localhost:3000/',
  },
  plugins: [
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
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              url: false,
              import: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
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
                ],
              }
            }
          }
        ]
      },
    ],
  },
}
