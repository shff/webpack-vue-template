const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "app"),
  entry: [ "./app.ts" ],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
  },
  plugins: [
    new ExtractTextPlugin("app.css"),
    new UglifyJsPlugin(),
    new OptimizeCSSPlugin({ safe: true }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      minify: { collapseWhitespace: true },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        exclude: /(node_modules)/,
        options: {
          extractCSS: true,
          loaders: {
            js: "vue-ts-loader",
            file: "file-loader",
            esModule: true,
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          compact: false,
          presets: [[ "@babel/preset-env", {
            forceAllTransforms: true,
            useBuiltIns: "usage",
          } ]],
        },
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
          compilerOptions: {
            lib: [ "es2015" ],
          },
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: "file-loader",
      },
      {
        test: /\.ya?ml$/,
        loader: "json-loader!yaml-loader",
      },
    ],
  },
  stats: {
    modules: false,
    children: false,
  },
};
