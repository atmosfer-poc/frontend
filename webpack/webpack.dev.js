const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/')
    },
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("dev-variable"),
      "process.env.apiUrl": JSON.stringify("http://localhost:8080/api"),
    }),
  ],
};
